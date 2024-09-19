import { SignUp } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return (
    <main className='h-full w-full'>
      <section class="bg-white">
    <div class="grid grid-cols-1 lg:grid-cols-2">
        <div class="relative flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 bg-gray-50 sm:px-6 lg:px-8">
            <div class="absolute inset-0">
                <Image   height="500"
              width="500" class="object-cover w-full h-full" src="https://images.unsplash.com/photo-1717501218385-55bc3a95be94?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

            <div class="relative">
                <div class="w-full max-w-xl xl:w-full xl:mx-auto xl:pr-24 xl:max-w-xl">
                    <h3 class="text-4xl font-bold text-white">Join 35k+ web professionals & <br class="hidden xl:block" />build your website</h3>
                    <ul class="grid grid-cols-1 mt-10 sm:grid-cols-2 gap-x-8 gap-y-4">
                        <li class="flex items-center space-x-3">
                            <div class="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                                <svg class="w-3.5 h-3.5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <span class="text-lg font-medium text-white"> Commercial License </span>
                        </li>
                        <li class="flex items-center space-x-3">
                            <div class="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                                <svg class="w-3.5 h-3.5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <span class="text-lg font-medium text-white"> Unlimited Exports </span>
                        </li>
                        <li class="flex items-center space-x-3">
                            <div class="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                                <svg class="w-3.5 h-3.5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <span class="text-lg font-medium text-white"> 120+ Coded Blocks </span>
                        </li>
                        <li class="flex items-center space-x-3">
                            <div class="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                                <svg class="w-3.5 h-3.5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <span class="text-lg font-medium text-white"> Design Files Included </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
            <div class="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
             
              
                    <SignUp/>
              

              
            </div>
        </div>
    </div>
</section>

    </main>
  )
}