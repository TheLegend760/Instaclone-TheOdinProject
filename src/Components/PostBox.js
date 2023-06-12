import React from 'react'
import styled from "styled-components";
import bot from '../images/bot.jpg'
import profile from '../images/profile.jpg'
import { CircleProfileSmall } from '../Styled Components/CircleProfileImg'
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'
import {FaRegComment} from 'react-icons/fa'
import { useCommentModal } from '../Context/CommentModalContext';
import { useAuth } from '../Context/AuthContext';
import { checkIsLiked, likePostHander } from './LikeFunctions';


const Post = styled.div`
    width: 480px;
    height: fit-content;
    margin: auto;
    display: flex;
    flex-direction: column;
    overflow: auto;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;
    .like-icon {
        transform: scale(1.5);
        cursor: pointer;
    }
    .comment-icon {
        transform: scale(1.2);
        cursor: pointer;
    }
    .red {
        fill: orangered;
        cursor: auto;
    }
    .view-comments {
        cursor: pointer;
    }
`
const ImgPost = styled.img`
    height: 100%;
    object-fit: contain;
`

const PostTopBar = styled.div`
  height: 58px;
  width: 100%;
  padding: 10px 16px;
  display: flex;
  flex-direction: row;
  align-content: center;
  gap: 10px;
  b {
  margin: auto 0 ;
}
`

const PostBottomSection = styled.div`
  padding: 10px 16px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
  .like-comment-post, .user-comment-post {
  display: flex;
  flex-direction: row;
  gap: 12px;
}
`

function PostBox(prop) {
    const {userData} = prop
    const {handleShowCommentModal} = useCommentModal()
    const authUser = useAuth()

    const whoLikedPost = userData.likes
    const like = checkIsLiked(whoLikedPost, authUser.currentUser.uid)
    const isLiked = like ? <AiFillHeart className='like-icon red'/> : <AiOutlineHeart className='like-icon' onClick={e => likePostHander(userData.postID, userData.posterUID, authUser.currentUser.uid)}/>

    const openComments = () => {
        handleShowCommentModal(userData)
    }

  return (
    <Post>
        <PostTopBar>
            <CircleProfileSmall src={userData.userPhotoURL}/>
            <b>{userData.displayName}</b>
        </PostTopBar>

        <ImgPost src={userData.imgURL}/>
        <PostBottomSection>
            <div className='like-comment-post'>
                {isLiked}
                 <FaRegComment className='comment-icon' onClick={e => openComments()}/>
            </div>

            <div className='likes-total-post'>
                <b>{userData.likes.length} Likes</b>
            </div>

            <div className='user-comment-post'>
                <b>{userData.displayName}</b> 
                <p>{userData.description}</p>
            </div>

            <span className='view-comments' onClick={e => openComments()}>View all comments</span>
        </PostBottomSection>
        
    </Post>
  )
}

export default PostBox