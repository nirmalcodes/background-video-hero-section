import React, { useEffect, useRef, useState } from 'react'
import { images, videos } from '../../utils'
import { FaPlay, FaPause } from 'react-icons/fa'

const HeroContainer = () => {
    const videoRef = useRef(null)
    const progressBarRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const togglePlay = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play()
            } else {
                videoRef.current.pause()
            }
        }
    }

    const radius = 25
    const circumference = 2 * Math.PI * radius

    const updateProgress = () => {
        if (videoRef.current) {
            const currentTime = videoRef.current.currentTime
            const duration = videoRef.current.duration
            const progress = (currentTime / duration) * 100
            const dashoffset = circumference * (1 - progress / 100)
            if (progressBarRef.current) {
                progressBarRef.current.style.strokeDashoffset = dashoffset
            }
        }
    }

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.addEventListener('timeupdate', updateProgress)
            videoRef.current.addEventListener('play', () => setIsPlaying(true))
            videoRef.current.addEventListener('pause', () =>
                setIsPlaying(false)
            )
        }
        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener(
                    'timeupdate',
                    updateProgress
                )
                videoRef.current.removeEventListener('play', () =>
                    setIsPlaying(true)
                )
                videoRef.current.removeEventListener('pause', () =>
                    setIsPlaying(false)
                )
            }
        }
    }, [])

    return (
        <>
            <div className="hero-wrapper">
                <video
                    ref={videoRef}
                    className="video"
                    loop
                    muted
                    autoPlay
                    poster={images.oceanPoster}
                >
                    <source src={videos.oceanVideo} type="video/mp4" />
                </video>

                <div className="video-overlay" />

                <div className="play-button-wrap">
                    <button className="play-button" onClick={togglePlay}>
                        {isPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                    <svg className="progress-ring" width="56" height="56">
                        <circle
                            ref={progressBarRef}
                            r={radius}
                            cx="28"
                            cy="28"
                            style={{
                                strokeDasharray: circumference,
                                strokeDashoffset: circumference,
                            }}
                        />
                    </svg>
                </div>

                <div className="content-wrap">
                    <h1>Hello World</h1>
                </div>
            </div>
        </>
    )
}

export default HeroContainer
