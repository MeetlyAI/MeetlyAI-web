"use client"

import React, { useState, useMemo, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default function ScheduleMeeting() {
  const [meetings, setMeetings] = useState([]);
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    start: '',
    end: '',
    attendees: ''
  });

  useEffect(() => {
    const storedMeetings = localStorage.getItem('meetings');
    if (storedMeetings) {
      setMeetings(JSON.parse(storedMeetings));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('meetings', JSON.stringify(meetings));
  }, [meetings]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMeeting(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedMeeting = {
      ...newMeeting,
      start: new Date(newMeeting.start),
      end: new Date(newMeeting.end)
    };
    setMeetings(prev => [...prev, formattedMeeting]);
    setNewMeeting({ title: '', start: '', end: '', attendees: '' });
  };

  const events = useMemo(() => {
    return meetings.map(meeting => ({
      title: meeting.title,
      start: new Date(meeting.start),
      end: new Date(meeting.end),
      allDay: false
    }));
  }, [meetings]);

  return (
    <div className="container mx-auto p-4 flex bg-gray-50">
      <div className="w-2/3 pr-4">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ height: '500px' }}>
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="w-1/3">
        <h1 className="text-2xl font-bold mb-4">Schedule a Meeting</h1>
        
        <Card className="mb-6 bg-white p-3">
          <CardHeader>
            <CardTitle>New Meeting</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={newMeeting.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="start">Start</Label>
                <Input
                  id="start"
                  name="start"
                  type="datetime-local"
                  value={newMeeting.start}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="end">End</Label>
                <Input
                  id="end"
                  name="end"
                  type="datetime-local"
                  value={newMeeting.end}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="attendees">Attendees</Label>
                <Input
                  id="attendees"
                  name="attendees"
                  value={newMeeting.attendees}
                  onChange={handleInputChange}
                  placeholder="Separate emails with commas"
                  required
                />
              </div>
              <Button className='bg-black text-white' type="submit">Schedule Meeting</Button>
            </form>
          </CardContent>
        </Card>

        <h2 className="text-xl font-semibold mb-2">Scheduled Meetings</h2>
        {meetings.length === 0 ? (
          <p>No meetings scheduled yet.</p>
        ) : (
          <div className="space-y-4">
            {meetings.map((meeting, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{meeting.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Start: {new Date(meeting.start).toLocaleString()}</p>
                  <p>End: {new Date(meeting.end).toLocaleString()}</p>
                  <p>Attendees: {meeting.attendees}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}