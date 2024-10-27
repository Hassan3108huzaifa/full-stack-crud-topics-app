import { NextResponse } from 'next/server';
import topics from '../../../data/topics';
import { Topic } from '../../../types/topics';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const topic = topics.find(t => t.id === params.id);
  if (topic) {
    return NextResponse.json(topic);
  }
  return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body: Partial<Topic> = await request.json();
  const index = topics.findIndex(t => t.id === params.id);
  if (index !== -1) {
    topics[index] = { ...topics[index], ...body };
    return NextResponse.json(topics[index]);
  }
  return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const index = topics.findIndex(t => t.id === params.id);
  if (index !== -1) {
    const deletedTopic = topics.splice(index, 1)[0];
    return NextResponse.json(deletedTopic);
  }
  return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
}