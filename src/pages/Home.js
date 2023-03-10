import './Home.css';


import Header from '../components/Header';
import QuickSongs from '../components/QuickSongs';
import Footer from '../components/Footer';
import AlbumsList from '../components/AlbumsList';
import ArtistsList from '../components/ArtistsList';

import Library from './Library';
import Search from './Search';
import LikedSongsList from './LikedSongsList';
import HistorySongs from './HistorySongs';
import AlbumSongsList from './AlbumSongsList';
import ArtistSongsList from './ArtistSongsList';
import AdminDashboard from './AdminDashboard';
import Users from './Users';
import UploadSong from './UploadSong';
import UploadArtist from './UploadArtist';
import UploadAlbum from './UploadAlbum';
import ManageArtists from './ManageArtists';
import ManageAlbums from './ManageAlbums';
import ManageSongs from './ManageSongs';

import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRandomSongs, getRandomArtists, getRandomAlbums } from '../features/homeSlice';
import { resetAddFavourite ,resetRemoveFavourite,getAllLikedSongsId} from '../features/playerSlice';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


function AlertMsg({ msg ,status , liked}) {

    const dispatch = useDispatch();

    if(status === "succeeded"){

        return (
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert icon={false}  severity="success" onClose={() => { liked === "adding" ?  dispatch(resetAddFavourite()) :   dispatch(resetRemoveFavourite())  }}>{msg}</Alert>
            </Stack>
        )
    }else if(status === "failed") {

        return (
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert icon={false} severity="error" onClose={() => { liked === "adding" ?  dispatch(resetAddFavourite()) :   dispatch(resetRemoveFavourite())  }}>{msg}</Alert>
            </Stack>
        )
    }

}

const Home = () => {

    const { user } = useSelector((state) => state.auth);
    const { songsPlayList, addFavouriteSongStatus,
     addFavouriteSongMsg,removeFavouriteSongStatus,
     removeFavouriteSongMsg } = useSelector((state) => state.player);


    const dispatch = useDispatch();

    const [timeOfDay, setTimeOfDay] = useState('morning');
    const [greet, setGreet] = useState("");

    async function getAllHomeData() {
        try {
            await Promise.all([dispatch(getRandomSongs()), dispatch(getRandomArtists()), dispatch(getRandomAlbums()) , dispatch(getAllLikedSongsId(user._id))]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        getAllHomeData();

        const date = new Date();
        const hour = date.getHours();

        if (hour >= 0 && hour < 4) {
            setTimeOfDay("midnight");
        } else if (hour >= 4 && hour < 8) {
            setTimeOfDay("dawn");
        } else if (hour >= 8 && hour < 12) {
            setTimeOfDay("morning");
            setGreet('Good Morning');
        } else if (hour >= 12 && hour < 16) {
            setTimeOfDay("noon");
            setGreet('Good Afternoon');

        } else if (hour >= 16 && hour < 20) {
            setTimeOfDay("eveing");
            setGreet('Good Evening');

        } else {
            setTimeOfDay("night");
        }
    }, [])


    return (
        <section className={`section ${timeOfDay}`}>
            <Header />

            <Routes>
                <Route path='/' element={

                    <div className='home-components'>

                        {addFavouriteSongStatus === "succeeded" && <AlertMsg msg={addFavouriteSongMsg} status={addFavouriteSongStatus} liked={"adding"}/>}
                        {addFavouriteSongStatus === "failed" && <AlertMsg msg={addFavouriteSongMsg} status={addFavouriteSongStatus} liked={"adding"}/>}
                        {removeFavouriteSongStatus === "succeeded" && <AlertMsg msg={removeFavouriteSongMsg} status={removeFavouriteSongStatus} liked={"removing"}/>}
                        {removeFavouriteSongStatus === "failed" && <AlertMsg msg={removeFavouriteSongMsg} status={removeFavouriteSongStatus} liked={"removing"}/>}

                        <h4 className='userWish'>{greet}</h4>

                        {/* This for latest 6 history songs or random 6 songs */}
                        <QuickSongs />

                        {/* This for albums list */}
                        <AlbumsList />

                        {/* This for artist list  */}
                        <ArtistsList />


                    </div>
                } >
                </Route>

                <Route path='/search' element={<Search />} />

                <Route path='/library'>
                    <Route index element={<Library />} />
                    <Route path='likedSongs' element={<LikedSongsList />} />
                    <Route path='historySongs' element={<HistorySongs />} />
                </Route>

                <Route path='/album/:id' element={<AlbumSongsList />} />
                <Route path='/artist/:id' element={<ArtistSongsList />} />

                {user?.role === "admin" && (
                    <Route path='/adminDashboard' >
                        <Route index element={<AdminDashboard />} />
                        <Route path='users' element={<Users />} />
                        <Route path='uploadArtist' element={<UploadArtist />} />
                        <Route path='uploadAlbum' element={<UploadAlbum />} />
                        <Route path='uploadSong' element={<UploadSong />} />
                        <Route path='manageArtists' element={<ManageArtists />} />
                        <Route path='manageAlbums' element={<ManageAlbums />} />
                        <Route path='manageSongs' element={<ManageSongs />} />
                    </Route>
                )}

                <Route path='*' element={<Navigate to="/" replace />} />
            </Routes>

            {songsPlayList.length > 0 &&
                <div>
                    <div className='gap' />
                    <Footer />
                </div>
            }

        </section >
    )
}
export default Home;


