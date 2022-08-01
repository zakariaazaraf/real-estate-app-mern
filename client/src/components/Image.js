import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


export function Image() {
    const { imageId } = useParams();
    const [imageSrc, setImageSrc] = useState('')

    const getImage = async (id) => {
        const response = await fetch(`http://localhost:5000/api/image/${id}`)

        if (response.ok) {
            let content = await response.json()
            console.log(content)
            setImageSrc(content.src)
        }
    }

    useEffect(() => {
        getImage(imageId)
    }, [])
  return (
    <img src={imageSrc} />
  )
}
