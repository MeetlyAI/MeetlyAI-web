"use client"
import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Play, Send, MessageCircle, FileText, ListPlus, Edit,Loader2  } from "lucide-react"
import { useAction } from 'convex/react'
import { api } from '@/convex/_generated/api'
const { GoogleGenerativeAI } = require("@google/generative-ai")
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// convex vector calculaton
const convexVector = (documents, query) => {
  const wordCounts = documents.map(doc => {
    const words = doc.toLowerCase().split(/\W+/)
    return words.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1
      return acc
    }, {})
  })

  const documentFrequency = {}
  wordCounts.forEach(counts => {
    Object.keys(counts).forEach(word => {
      documentFrequency[word] = (documentFrequency[word] || 0) + 1
    })
  })

  const tfidf = wordCounts.map(counts => {
    const result = {}
    Object.keys(counts).forEach(word => {
      const tf = counts[word] / Object.values(counts).reduce((a, b) => a + b)
      const idf = Math.log(documents.length / (documentFrequency[word] || 1))
      result[word] = tf * idf
    })
    return result
  })

  const queryWords = query.toLowerCase().split(/\W+/)
  const queryVector = queryWords.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1
    return acc
  }, {})

  return documents.map((doc, index) => {
    let similarity = 0
    queryWords.forEach(word => {
      if (tfidf[index][word]) {
        similarity += tfidf[index][word] * queryVector[word]
      }
    })
    return { doc, similarity }
  })
}

export default function VideoInsightHub() {
  const { id } = useParams()
  const [videoData, setVideoData] = useState(null)
  const [chatMessages, setChatMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [keyPoints, setKeyPoints] = useState([])
  const [notes, setNotes] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const videoRef = useRef(null)
  const chatEndRef = useRef(null)
  const chatScrollAreaRef = useRef(null)
  const transcriptScrollAreaRef = useRef(null)
  const notesRef = useRef(null)

  useEffect(() => {
    const storedData = sessionStorage.getItem('currentVideo')
    if (storedData) {
      setVideoData(JSON.parse(storedData))
    }

    const storedKeyPoints = localStorage.getItem(`keyPoints${id}`)
    const storedNotes = localStorage.getItem(`notes${id}`)
    if (storedKeyPoints) setKeyPoints(JSON.parse(storedKeyPoints))
    if (storedNotes) setNotes(storedNotes)
  }, [id])

  useEffect(() => {
    if (chatScrollAreaRef.current) {
      chatScrollAreaRef.current.scrollTo(0, chatScrollAreaRef.current.scrollHeight)
    }
  }, [chatMessages])

  useEffect(() => {
    localStorage.setItem(`keyPoints${id}`, JSON.stringify(keyPoints))
    localStorage.setItem(`notes${id}`, notes)
  }, [keyPoints, notes, id])

  useEffect(() => {
    if (videoData && videoData.jsonText) {
      summarizeTranscript()
    }
  }, [videoData])

  const summarizeTranscript = async () => {
    try {
      setIsLoading(true)
      const transcriptSummary = JSON.parse(videoData.jsonText).transcriptSummary
      const fullTranscript = transcriptSummary.map(item => item.text).join(' ')
      
      const genAI = new GoogleGenerativeAI("AIzaSyCTRZ4q_hKvggvM_rApR_10l3nMr6OtASM")
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
      const prompt = `Summarize the following transcript into 5-7 key points: "${fullTranscript}"`
      const result = await model.generateContent(prompt)
      const summary = await result.response.text()
      
      setKeyPoints(summary.split('\n').filter(point => point.trim() !== ''))
    } catch (error) {
      console.error("Error summarizing transcript:", error)
    } finally {
      setIsLoading(false)
    }
  }

  function findRelevantRecipe(query) {
    if (!videoData || !videoData.jsonText) return "No data available"

    const summaries = JSON.parse(videoData.jsonText).transcriptSummary.map(item => item.text)
    const results = convexVector(summaries, query)
    const mostRelevant = results.sort((a, b) => b.similarity - a.similarity)[0]
    
    return mostRelevant ? mostRelevant.doc : "No relevant information found"
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      setChatMessages(prev => [...prev, { text: newMessage, sender: 'user' }])
      setIsLoading(true)
      
      try {
        const relevantInfo = findRelevantRecipe(newMessage)
        const genAI = new GoogleGenerativeAI("AIzaSyCTRZ4q_hKvggvM_rApR_10l3nMr6OtASM")
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
        const prompt = `Based on the relevant information "${relevantInfo}", please respond to the following "${newMessage}" without including any symbols like** and please answer directly.`
        const result = await model.generateContent(prompt)
        const generatedText = await result.response.text()
        
        setChatMessages(prev => [...prev, { text: generatedText, sender: 'ai' }])
      } catch (error) {
        console.error("Error processing message:", error)
        setChatMessages(prev => [...prev, { text: "Sorry, there was an error processing your message.", sender: 'ai' }])
      } finally {
        setIsLoading(false)
      }
      setNewMessage('')
    }
  }

  const handleTimestampClick = (startTime) => {
    if (videoRef.current) {
      videoRef.current.currentTime = startTime / 1000
      videoRef.current.play()
    }
  }

  const handleNotesChange = (e) => {
    setNotes(e.target.value)
  }

  if (!videoData) return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="animate-pulse text-3xl font-bold text-gray-600">Loading amazing content...</div>
    </div>
  )

  const transcriptSummary = JSON.parse(videoData.jsonText).transcriptSummary

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 flex flex-col min-h-screen">
      
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/2 flex flex-col space-y-4 lg:sticky lg:top-6 self-start">
            <Card className="overflow-hidden rounded-xl shadow-lg bg-white border border-gray-200">
              <CardContent className="p-4">
                <h2 className="text-xl font-bold mb-2 text-gray-700">Video Player</h2>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <video 
                    ref={videoRef} 
                    src={videoData.img} 
                    controls 
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-xl shadow-md bg-gray-50 border border-gray-200">
              <CardContent className="p-4">
                <h2 className="text-xl font-bold mb-2 text-gray-700">{videoData.fileName}</h2>
                <p className="text-sm text-gray-500">
                  {new Date(videoData.date).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="lg:w-1/2 w-full flex flex-col">
            <Card className="flex-grow flex flex-col overflow-hidden rounded-xl shadow-lg bg-white border border-gray-200">
              <CardContent className="p-4 flex flex-col h-full">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2 mb-4">
                  <Input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-grow bg-white text-gray-800 border-gray-300"
                    placeholder="Type your message..."
                  />
                  <Button type="submit" className="bg-gray-800 hover:bg-gray-700 text-white">
                    <Send className="w-4 h-4" />
                  </Button>
                </form>

                <Tabs defaultValue="chat" className="flex-grow flex flex-col">
                  <TabsList className="grid w-full grid-cols-4 bg-gray-100">
                    <TabsTrigger value="chat" className="data-[state=active]:bg-white data-[state=active]:text-gray-800">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat
                    </TabsTrigger>
                    <TabsTrigger value="transcript" className="data-[state=active]:bg-white data-[state=active]:text-gray-800">
                      <FileText className="w-4 h-4 mr-2" />
                      Transcript
                    </TabsTrigger>
                    <TabsTrigger value="keyPoints" className="data-[state=active]:bg-white data-[state=active]:text-gray-800">
                      <ListPlus className="w-4 h-4 mr-2" />
                      Key Points
                    </TabsTrigger>
                    <TabsTrigger value="notes" className="data-[state=active]:bg-white data-[state=active]:text-gray-800">
                      <Edit className="w-4 h-4 mr-2" />
                      Notes
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="chat" className="flex-grow overflow-hidden">
                    <ScrollArea className="h-full">
                      <div ref={chatScrollAreaRef} className="space-y-4 p-4">
                        {chatMessages.map((message, index) => (
                          <div
                            key={index}
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`rounded-lg p-3 max-w-xs lg:max-w-md ${message.sender === 'user' ? 'bg-gray-200' : 'bg-gray-100'}`}>
                              {message.text}
                            </div>
                          </div>
                        ))}
                        {isLoading && (
                          <div className="flex justify-center">
                            <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
                          </div>
                        )}
                        <div ref={chatEndRef} />
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="transcript" className="flex-grow overflow-hidden">
                    <ScrollArea className="h-full">
                      <div ref={transcriptScrollAreaRef} className="space-y-4 p-4">
                        {transcriptSummary.map((item, index) => (
                          <div
                            key={index}
                            className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => handleTimestampClick(item.timestamp.start)}
                          >
                            <div className="flex items-center mb-1">
                              <Play className="w-4 h-4 mr-2 text-gray-600" />
                              <span className="text-sm text-gray-500">
                                {new Date(item.timestamp.start).toISOString().substr(11, 8)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700">{item.text}</p>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="keyPoints" className="flex-grow overflow-hidden">
                    <ScrollArea className="h-full">
                      <div className="space-y-3 p-4">
                        {isLoading ? (
                          <div className="flex justify-center items-center h-full">
                            <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
                          </div>
                        ) : (
                          keyPoints.map((point, index) => (
                            <div key={index} className="p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center">
                                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-3 flex-shrink-0 text-gray-700">
                                  {index + 1}
                                </div>
                                <p className="text-gray-700">{point}</p>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="notes" className="flex-grow overflow-hidden">
                    <ScrollArea className="h-full">
                      <div className="p-4">
                        <textarea
                          ref={notesRef}
                          value={notes}
                          onChange={handleNotesChange}
                          className="w-full h-full min-h-[300px] p-3 bg-white text-gray-800 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-400"
                          placeholder="Type your notes here..."
                        />
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}