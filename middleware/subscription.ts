// middleware/subscription.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import prisma from '@/lib/prisma';

export async function requireSubscription(
  req: NextRequest,
  { params }: { params: { id?: string } }
) {
  try {
    // 1. التحقق من تسجيل الدخول
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    
    if (!token || !token.id) {
      return NextResponse.json(
        { error: 'يجب تسجيل الدخول أولاً' },
        { status: 401 }
      );
    }

    // 2. التحقق من الاشتراك النشط
    const activeSubscription = await prisma.subscription.findFirst({
      where: {
        userId: token.id as string,
        status: 'active',
        currentPeriodEnd: {
          gt: new Date(),
        },
      },
    });

    if (!activeSubscription) {
      return NextResponse.json(
        { 
          error: 'محتاج اشتراك فعال عشان توصل للمحتوى ده',
          requiresSubscription: true 
        },
        { status: 403 }
      );
    }

    // 3. إضافة المعلومات للـ request
    (req as any).user = token;
    (req as any).subscription = activeSubscription;

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في التحقق من الاشتراك' },
      { status: 500 }
    );
  }
}

// دالة مساعدة للتحقق من حالة الاشتراك
export async function checkSubscriptionStatus(userId: string) {
  const subscription = await prisma.subscription.findFirst({
    where: {
      userId,
      status: 'active',
      currentPeriodEnd: {
        gt: new Date(),
      },
    },
    orderBy: {
      currentPeriodEnd: 'desc',
    },
  });

  return {
    hasActiveSubscription: !!subscription,
    subscription,
    expiresAt: subscription?.currentPeriodEnd,
  };
}