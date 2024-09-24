"use client"

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { UserPlus } from 'lucide-react'

// This is a mock function to simulate sending an invitation
const sendInvitation = async (friendId) => {
  // In a real implementation, this would call an API to send the invitation
  console.log(`Sending invitation to friend with ID: ${friendId}`)
  return new Promise((resolve) => setTimeout(resolve, 1000))
}

export default function InviteFriend() {
  const [friendId, setFriendId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!friendId.trim()) {
      setMessage({ type: 'error', text: "Please enter a friend's ID" })
      return
    }

    setIsLoading(true)
    setMessage(null)

    try {
      await sendInvitation(friendId)
      setMessage({ type: 'success', text: `Invitation sent to friend with ID: ${friendId}` })
      setFriendId("")
    } catch (error) {
      setMessage({ type: 'error', text: "Failed to send invitation. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
<div className="container mx-auto p-4 max-w-md">
  <Card>
    <CardHeader>
      <CardTitle className="text-2xl font-bold text-center">Invite a Friend</CardTitle>
    </CardHeader>
    <CardContent>
      {message && (
        <div
          role="alert"
          aria-live="assertive"
          className={`mb-4 p-2 rounded text-center ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
        >
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="friendId">Friend's ID</Label>
          <Input
            id="friendId"
            type="text"
            placeholder="Enter your friend's ID"
            value={friendId}
            onChange={(e) => setFriendId(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full hover:bg-blue-600 transition" disabled={isLoading}>
          {isLoading ? (
            <span className="flex items-center justify-center">
              {/* Spinner */}
              Sending Invitation...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <UserPlus className="mr-2 h-4 w-4" />
              Send Invitation
            </span>
          )}
        </Button>
      </form>
    </CardContent>
  </Card>
</div>


  )
}