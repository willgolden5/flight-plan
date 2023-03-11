import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { last, certNum, userId } = req.body as { last: string, certNum: string, userId: string}
    const authResult = await fetch(`https://airmen-auth-service.fly.dev/pilot?lastName=${last}&certificate=${certNum}&id=${userId}`)
    
    if(authResult.status === 401) {
        res.status(401).json({ message: 'Unauthorized' })
    }
    if(authResult.status === 404) {
        res.status(404).json({ message: 'Pilot Not Found' })
    }
    if(authResult.status === 500) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
    
    res.status(200).json({ message: 'Pilot Validated' })
}
