"use client"

"use client"

import React, { useState, useEffect } from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import { motion } from 'framer-motion'
import { Upload as UploadIcon, Video as VideoIcon, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { AssemblyAI } from 'assemblyai';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { useAuth } from '@clerk/nextjs'

const { GoogleGenerativeAI } = require("@google/generative-ai");

export default function Component() {
  const [isUploading, setIsUploading] = useState(false)
  const [isUploaded, setIsUploaded] = useState(false)
  const [arr, setArr] = useState([])
  const [img, setImg] = useState('');
  const [embede, setEmbede] = useState([]);
  const [jsonRes, setJsonRes] = useState({});
  const [cleanRes, setCleanRes] = useState('');
  const [userId, setUserId] = useState('');
const [fileName,setFileName] = useState('')
  const { user } = useUser();
  const { isLoaded, sessionId, getToken } = useAuth()

  const genAI = new GoogleGenerativeAI("AIzaSyCTRZ4q_hKvggvM_rApR_10l3nMr6OtASM");
  const createMeet = useMutation(api.meet.createMeet);
   const convex = useConvex();

  useEffect(() => {
    if (user) {
      setUserId(user.id);
    }
  }, [user]);
function generateUID() {
    // Current timestamp in milliseconds
    const timestamp = Date.now().toString(36);

    // Random number for uniqueness
    const randomPart = Math.random().toString(36).substring(2, 10);

    // Combine both to form the UID
    const uid = `${timestamp}-${randomPart}`;

    return uid;
}
  useEffect(() => {
    const uid = crypto.randomUUID();
    if (embede.length > 0 && Object.keys(jsonRes).length > 0 && uid !== null) {
      
      createMeet({
        userId,
        img,
        date: new Date().toISOString(),
        cleanRes:uid,
        embedding: embede,
        jsonText: JSON.stringify(jsonRes),
        fileName:fileName
      });
      console.log("cool")
    }else{
      console.log("fuck")
    }
  }, [img, embede, jsonRes, userId, cleanRes]);

  const handleSuccess = async (result) => {
    console.log('Upload success:', result)
    if (result.info && result.info.secure_url) {
      const client = new AssemblyAI({
        apiKey: '1a2ee50845c944d59ff01998c48e5e45',
      });
      console.log(result.info.secure_url)
      setImg(result.info.secure_url)
      setIsUploaded(true)
      setIsUploading(false)
       setFileName(result.info.original_filename || 'Unknown')
      const audioFile = result.info.secure_url

      const params = {
        audio: audioFile,
        iab_categories: true
      }

      const run = async () => {
        const transcript = await client.transcripts.transcribe(params);
        const resultsArray = [];

        for (const result of transcript.iab_categories_result.results) {
          resultsArray.push({
            text: result.text,
            timestamp: `Start: ${result.timestamp?.start} - End: ${result.timestamp?.end}`
          });
        }

        if (resultsArray.length === 0) {
          console.log("Empty");
          return;
        }

        console.log(resultsArray);

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `I have a transcript that includes text with timestamps. Please summarize the key points from the text and provide ${JSON.stringify(resultsArray)} a JSON output. Each key point should include the text and the corresponding timestamp (both start and end). only give out put in this format:
        {
          "transcriptSummary": [
            {
              "timestamp": {
                "start": 240,
                "end": 28786
              },
              "text": "Smoke from Canadian wildfires is causing air quality alerts across the US, with warnings to stay inside in some places. Peter DiCarlo explains the situation."
            },
            {
              "timestamp": {
                "start": 28938,
                "end": 56104
              },
              "text": "The dry season and weather systems are channeling smoke from Canadian wildfires into the mid-Atlantic and Northeast US."
            }
          ]
        }
        `;

        try {
          const result = await model.generateContent(prompt);
          const generatedText = await result.response.text();
          console.log(generatedText);
          const cleanedRes = (generatedText.trim()).replace(/```JSON/gi, '').replace(/```/g, '').replace(/json/gi, '').replace('**Interview Questions:**','').replace('*','');
          setCleanRes(cleanedRes);

          const parsedJsonRes = JSON.parse(cleanedRes)
          console.log("Json")
          console.log(parsedJsonRes)
          setJsonRes(parsedJsonRes);

          const modelE = genAI.getGenerativeModel({ model: "text-embedding-004" });
          const resultE = await modelE.embedContent(generatedText);
          const embedding = resultE.embedding;
          console.log(embedding.values);
          setEmbede(embedding.values);

        } catch (error) {
          console.error('Error:', error);
        }
      }

      run()
    }
  }


  return (
    <div className="h-full flex items-start justify-center bg-gray-50 p-4">
      
      <Card className="w-full max-w-md border-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            Upload Your Meet Video
          </CardTitle>
          <CardDescription className="text-center mb-4 text-gray-600 dark:text-gray-400">
            Share your vision with the world
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CldUploadWidget 
            uploadPreset="ml_default" 
            onSuccess={handleSuccess}
            onStart={() => setIsUploading(true)}
          >
            {({ open }) => (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => open()}
                  className="w-full h-40 flex flex-col items-center justify-center space-y-4 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-xl shadow-lg transition-all duration-300 ease-in-out"
                  disabled={isUploading}
                >
                  {isUploaded ? (
                    <React.Fragment>
                      <Check className="w-12 h-12" />
                      <span className="font-semibold">Upload Successful!</span>
                    </React.Fragment>
                  ) : isUploading ? (
                    <React.Fragment>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <UploadIcon className="w-12 h-12" />
                      </motion.div>
                      <span className="font-semibold">Uploading...</span>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <VideoIcon className="w-12 h-12" />
                      <span className="font-semibold">Click to Upload Video</span>
                    </React.Fragment>
                  )}
                </Button>
              </motion.div>
            )}
          </CldUploadWidget>
          <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
            Supported formats: MP4, WebM, MOV (max 100MB)
          </p>
        </CardContent>
      </Card>
    </div>
  )
}