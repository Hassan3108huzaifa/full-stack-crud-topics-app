import { NextResponse } from 'next/server';
import topics from '../../data/topics';
import { Topic } from '../../types/topics';

export async function GET() {
  return NextResponse.json(topics);
}

export async function POST(request: Request) {
  const body: Topic = await request.json();
  const newTopic: Topic = {
    id: Date.now().toString(),
    title: body.title,
    description: body.description,
  };
  topics.push(newTopic);
  return NextResponse.json(newTopic, { status: 201 });
}