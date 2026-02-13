import { useState, useEffect } from 'react';
import Service from '../appwrite/config';
import { useSelector } from 'react-redux';

const LikeButton = ({ postId }) => {
  const user = useSelector((state) => state.auth.userData);
  const [isLiked, setIsLiked] = useState(false);
  const [likeId, setLikeId] = useState(null);
  const [likeCount, setLikeCount] = useState(0);

  // Fetch likes and check if the user has already liked
  const fetchLikesData = async () => {
    try {
      const likes = await Service.getPostLikes(postId);
      setLikeCount(typeof likes === "number" ? likes : 0);

      if (user) {
        const existingLike = await Service.checkUserLike(postId, user.$id);
        if (existingLike?.documents?.length > 0) {
          setIsLiked(true);
          setLikeId(existingLike.documents[0].$id);
        } else {
          setIsLiked(false);
          setLikeId(null);
        }
      } else {
        setIsLiked(false);
        setLikeId(null);
      }
    } catch (error) {
      // console.error('Error fetching likes:', error);
    }
  };

  // Run on mount and when user/postId changes
  useEffect(() => {
    fetchLikesData();
  }, [postId, user]);

 
  const handleLike = async () => {
    if (!user) {
      alert('Please login to like posts');
      return;
    }

    try {
      if (isLiked) {
        if (!likeId) {
          // console.error("Error: Missing likeId while unliking.");
          return;
        }
        await Service.unlikePost(likeId);
        setIsLiked(false);
        setLikeId(null);
        setLikeCount((prev) => Math.max(prev - 1, 0)); 
      } else {
        const newLike = await Service.likePost(postId, user.$id);
        setIsLiked(true);
        setLikeId(newLike.$id);
        setLikeCount((prev) => prev + 1);
      }
    } catch (error) {
      // console.error('Like error:', error);
    }
  };

  return (
    <button 
      onClick={handleLike}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
        ${isLiked ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 ${isLiked ? 'fill-current' : 'stroke-current'}`}
        viewBox="0 0 24 24"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <span>{likeCount}</span>
    </button>
  );
};

export default LikeButton;
