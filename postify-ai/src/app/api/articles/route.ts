import { NextResponse } from 'next/server';
import { fetchArticles } from '@/lib/huggingface';

export async function GET() {
    try {
        const articles = await fetchArticles();
        return NextResponse.json(articles);
    } catch (error) {
        return NextResponse.error();
    }
}