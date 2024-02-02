import prisma from '@/prisma'

const getAllUser = async() => {
try {
    const user = await prisma.user.findMany()
    return user
} catch (error) {
    throw error
    
}
}

export default getAllUser