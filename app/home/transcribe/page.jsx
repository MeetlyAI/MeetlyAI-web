"use client"

import React, { useState } from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import { motion } from 'framer-motion'
import { Upload as UploadIcon, Video as VideoIcon, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function Component() {
  const [isUploading, setIsUploading] = useState(false)
  const [isUploaded, setIsUploaded] = useState(false)

  const handleSuccess = async (result) => {
    console.log('Upload success:', result)
    if (result.info && result.info.secure_url) {
      console.log(result.info.secure_url)
      setIsUploaded(true)
      setIsUploading(false)
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