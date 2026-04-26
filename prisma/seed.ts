import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Clear existing data to ensure a clean seed and avoid unique constraint errors
  await prisma.video.deleteMany()
  await prisma.module.deleteMany()
  await prisma.course.deleteMany()

  // 1. Rich Dad Poor Dad Masterclass
  const course1 = await prisma.course.upsert({
    where: { id: 'course-rich-dad' },
    update: {},
    create: {
      id: 'course-rich-dad',
      title: 'Rich Dad Poor Dad: Financial Freedom Masterclass',
      description: 'Learn the secrets of the wealthy and how to build assets that pay for your lifestyle. Based on Robert Kiyosaki\'s best-selling book.',
      price: 499,
      category: 'Business',
      thumbnail: 'https://images.unsplash.com/photo-1592488026725-376bec19abd0?q=80&w=2070&auto=format&fit=crop',
      isPublished: true,
      modules: {
        create: [
          {
            id: 'mod-rd-1',
            title: 'Mindset of the Wealthy',
            order: 1,
            videos: {
              create: [
                {
                  title: 'Assets vs Liabilities',
                  videoUrl: 'https://www.youtube.com/embed/6m6S229D4vM', // Using YouTube embed as placeholder
                  duration: 600,
                  order: 1,
                  isFreePreview: true
                },
                {
                  title: 'Why the Rich Get Richer',
                  videoUrl: 'https://www.youtube.com/embed/W_XmYt9fL38',
                  duration: 840,
                  order: 2,
                  isFreePreview: false
                }
              ]
            }
          }
        ]
      }
    }
  })

  // 2. NCERT Physics Class 12
  const course2 = await prisma.course.upsert({
    where: { id: 'course-physics-12' },
    update: {},
    create: {
      id: 'course-physics-12',
      title: 'Class 12 Physics: Electrostatics & Current',
      description: 'Comprehensive guide to Class 12 Physics NCERT. Perfect for CBSE, ICSE and State Board exams.',
      price: 999,
      category: 'NCERT Physics',
      thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=1974&auto=format&fit=crop',
      isPublished: true,
      modules: {
        create: [
          {
            id: 'mod-phy-1',
            title: 'Electrostatic Potential',
            order: 1,
            videos: {
              create: [
                {
                  title: 'Introduction to Charges',
                  videoUrl: 'https://www.youtube.com/embed/OTmS_Z9kG_4',
                  duration: 1200,
                  order: 1,
                  isFreePreview: true
                },
                {
                  title: 'Coulomb\'s Law Explained',
                  videoUrl: 'https://www.youtube.com/embed/tZ_nL7iP0sY',
                  duration: 1500,
                  order: 2,
                  isFreePreview: false
                }
              ]
            }
          }
        ]
      }
    }
  })

  // 3. History of Modern India
  const course3 = await prisma.course.upsert({
    where: { id: 'course-history' },
    update: {},
    create: {
      id: 'course-history',
      title: 'History of Modern India: 1857 to Independence',
      description: 'A deep dive into the Indian Freedom Struggle. Essential for UPSC and State PCS aspirants.',
      price: 299,
      category: 'History',
      thumbnail: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop',
      isPublished: true,
      modules: {
        create: [
          {
            id: 'mod-hist-1',
            title: 'The Revolt of 1857',
            order: 1,
            videos: {
              create: [
                {
                  title: 'Causes of the Revolt',
                  videoUrl: 'https://www.youtube.com/embed/5F_fN0Z5Gts',
                  duration: 900,
                  order: 1,
                  isFreePreview: true
                }
              ]
            }
          }
        ]
      }
    }
  })

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
