import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    if (!body.name || !body.email || !body.message || !body.rating || !body.productId) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }
    
    const doc = {
      _type: "productReview",
      product: {
        _ref: body.productId,
        _type: "reference",
      },
      name: body.name,
      email: body.email,
      rating: body.rating,
      message: body.message,
      isApproved: false,
      createdAt: new Date().toISOString(),
    }
    
    const result = await writeClient.create(doc)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Your comment has been sent successfully.',
      data: result 
    })
    
  } catch (error: any) {
    console.error('Error creating comment:', error)
    return NextResponse.json(
      { error: error.message || 'Comment could not be sent' },
      { status: 500 }
    )
  }
}