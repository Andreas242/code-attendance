import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import styles from "../styles/Home.module.css";
import { TransitionGroup, CSSTransition } from "react-transition-group";

interface Timestamp {
    time: number;
    label: string;
}

interface Attendee {
    id: number;
    name: string;
}

interface PresentationProps {
    recognizedNames: string[];
}

const Presentation: React.FC<PresentationProps> = ({ recognizedNames }) => {
    const [language, setLanguage] = useState('');
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [isClient, setIsClient] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [isVideoBusy, setIsVideoBusy] = useState(false);
    const [isSearchingFaster, setIsSearchingFaster] = useState(false);
    const [isShowNameBig, setShowNameBig] = useState(false);
    const [counter, setCounter] = useState(0);
    const [videoTime, setVideoTime] = useState(0); 
    const playerRef = useRef<ReactPlayer>(null);

    const [attendees, setAttendees] = useState<Attendee[]>([]);
    const [newAttendee, setNewAttendee] = useState<string>("");

    const addAttendee = () => {
        setNewAttendee(recognizedNames[recognizedNames.length - 1]);
        setTimeout(() => {
            const newId = attendees.length > 0 ? attendees[attendees.length - 1].id + 1 : 1;
            setAttendees([...attendees, { id: newId, name: recognizedNames[recognizedNames.length - 1] }]);
            setNewAttendee('');
        }, 21400)
    };

    useEffect(() => {
        setIsClient(true);
        if (!isPlaying) {
            setIsPlaying(true);
        }
    }, []);

    useEffect(() => {
        if(!isMuted) {
            console.log(recognizedNames.length + ' ' + attendees.length);
            if (!isVideoBusy && recognizedNames.length > attendees.length) {
                addAttendee();
                console.log(attendees.length);
                //  playVideo();
                language === 'E' ?  handleTimestampClick(6.1) : handleTimestampClick(1.25);
                setIsVideoBusy(true);
                setIsSearching(true);
            }
        }
    }, [recognizedNames, attendees, isVideoBusy, isMuted]);

    const timestamps: Timestamp[] = [
        { time: 6.1, label: "Timestamp 1" },
        { time: 22.5, label: "Timestamp 2" },
        { time: 33.7, label: "Timestamp 3" },
    ];

    const handleTimestampClick = (time: number) => {
        setIsMuted(false);
        playerRef.current?.seekTo(time);
    };

    const handleProgressEnglish = ({ playedSeconds }: { playedSeconds: number }) => {
        //   console.log(playedSeconds);
        if (isPlaying && playedSeconds > 4.5 && playedSeconds < 6) {
            //      console.log('STOP');
            const newCounter = counter + 1;
            setCounter(newCounter);
            if (counter < 8) {
                playerRef.current?.seekTo(0);

            } else {
                playerRef.current?.seekTo(34);
                setCounter(0);
            }
            setIsVideoBusy(false);
        }
        if (isPlaying && playedSeconds > 16) {
            setIsSearchingFaster(true);
        }
        if (isPlaying && playedSeconds > 21) {
            setIsSearching(false);
            setIsSearchingFaster(false);
            setShowNameBig(true);
        }
        if (isPlaying && playedSeconds > 33) {
            setIsVideoBusy(false);
            setShowNameBig(false);
        }
    };

    const handleProgressNorwegian = ({ playedSeconds }: { playedSeconds: number }) => {
     //   console.log(playedSeconds);
     if (isPlaying && playedSeconds > 0.55 && playedSeconds <= 1.2) {
         //      console.log('STOP');
         const newCounter = counter + 1;
         setCounter(newCounter);
         if (counter < 18) {
             playerRef.current?.seekTo(0);

         } else {
             playerRef.current?.seekTo(26);
             setCounter(0);
         }
         setIsVideoBusy(false);
     }
     if (isPlaying && playedSeconds > 12) {
         setIsSearchingFaster(true);
     }
     if (isPlaying && playedSeconds > 18) {
         setIsSearching(false);
         setIsSearchingFaster(false);
         setShowNameBig(true);
     }
     if (isPlaying && playedSeconds > 33) {
         setIsVideoBusy(false);
         setShowNameBig(false);
     }
 };

    if (!isClient) {
        return <div>Loading...</div>;
    }

    function addRandomAttendee(): void {
        throw new Error("Function not implemented.");
    }

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                
                <h1 className={styles.title}>R E G I S T R A T I O N</h1>

                <div className={styles.innerWrapper}>

                    <div className={styles.video}>
                    {language ==='E' && <ReactPlayer
                            url="Welcome_final.mp4"
                            autoPlay
                            muted={isMuted}
                            data-autoplay=""
                            playing={isPlaying}
                            ref={playerRef}
                            onProgress={handleProgressEnglish}
                            
                            height={'99vh'}
                            loop={true}
                        />
                    }
                    {language ==='N' && <ReactPlayer
                            url="Welcome3.mp4"
                            autoPlay
                            muted={isMuted}
                            data-autoplay=""
                            playing={isPlaying}
                            ref={playerRef}
                            onProgress={handleProgressNorwegian}                            
                            height={'99vh'}
                            loop={true}
                            controls
                        />

                    }
                    </div>

                    <div className={styles.registerdArea}>
                        <div className={styles.attendeesInput}>
                            {isSearching &&
                                <div className={styles.wrap}>
                                    <div className={styles.loading}>
                                        <div className={styles.bounceball}></div>
                                        {!isSearchingFaster && <div className={styles.text}>SØKER...</div>}
                                        {isSearchingFaster && <div className={styles.text}>SØKER... RASKARE</div>}
                                    </div>
                                </div>}
                            {isShowNameBig && !isSearching && 
                            <div className={`${styles.bigName} ${styles.lineUp} ${styles.out}`}>{newAttendee}</div>}
                        </div>
                        <div id="" className={styles.attendeesList}>
                            <TransitionGroup component={null}>
                                {attendees.map((attendee) => (
                                    <CSSTransition key={attendee.id} timeout={500} classNames="attendee">
                                        <div className={styles.attendeeItem}>{attendee.name}</div>
                                    </CSSTransition>
                                ))}
                            </TransitionGroup>
                        </div>
                    </div>
                </div>
            </main>
            <div className={styles.buttonGroup}>
                <button disabled={isVideoBusy} onClick={(()=> setLanguage('N'))} className={styles.languageButton}>Norsk</button>
                <button disabled={isVideoBusy} onClick={(()=> setLanguage('E'))} className={styles.languageButton}>Engelsk</button>
                {isMuted && language !='' && <button onClick={()=> setIsMuted(false)} className={styles.languageButton}>Start</button>}
            </div>
        </div>
    );
};

export default Presentation;

