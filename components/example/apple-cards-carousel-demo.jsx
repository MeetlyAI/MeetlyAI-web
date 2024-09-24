"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export default function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full ">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        What we offer
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                            Meetly: Revolutionizing Your Meetings with AI

              </span>{" "}

Meetly captures every key detail with AI-powered transcription, making your meetings more productive. Instantly access summarized key points, chat with the AI to clarify insights, and manage projects efficiently—all in one place. Say goodbye to rewatching recordings and hello to smarter meeting management. With Meetly, you'll never miss an important detail again.
            </p>
            <Image
              src="/hero.svg"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};
const data = [
  {
    category: "AI Transcription",
    title: "Accurate AI-powered meeting transcriptions.",
    src: "https://images.unsplash.com/photo-1717501218385-55bc3a95be94?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Chat with Meetly",
    title: "Ask Meetly anything about your meeting.",
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Key Points Summary",
    title: "Get quick access to key meeting points.",
    src: "https://images.unsplash.com/photo-1655549869798-00a49a00fe18?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8a2V5JTIwcG9pbnRzfGVufDB8fDB8fHww",
    content: <DummyContent />,
  },
  {
    category: "Meeting Notes",
    title: "Organize your meeting notes effortlessly.",
    src: "https://images.unsplash.com/photo-1616628188550-808682f3926d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Project Management",
    title: "Manage your projects directly from Meetly.",
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=4000&auto=format&fit=crop&ixlib=rb-4.0.3",
    content: <DummyContent />,
  },
  {
    category: "Client Management",
    title: "Keep track of your clients and meetings.",
    src: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=4000&auto=format&fit=crop&ixlib=rb-4.0.3",
    content: <DummyContent />,
  },
];


