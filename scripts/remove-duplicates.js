const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Checking for duplicate subscriptions...');

  // Get all subscriptions
  const allSubs = await prisma.subscription.findMany({
    orderBy: { createdAt: 'asc' }
  });

  console.log(`Total subscriptions: ${allSubs.length}`);

  // Find and mark duplicates
  const seen = new Map();
  const duplicateIds = [];

  for (const sub of allSubs) {
    const key = `${sub.userId}-${sub.courseId}`;
    if (seen.has(key)) {
      duplicateIds.push(sub.id);
      console.log(`❌ Duplicate found: User ${sub.userId} - Course ${sub.courseId}`);
    } else {
      seen.set(key, sub.id);
    }
  }

  console.log(`\nFound ${duplicateIds.length} duplicates`);

  // Delete duplicates
  if (duplicateIds.length > 0) {
    await prisma.subscription.deleteMany({
      where: {
        id: { in: duplicateIds }
      }
    });
    console.log('✅ Duplicates removed successfully!');
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error('❌ Error:', e);
  process.exit(1);
});