import { useState, useEffect } from "react";
import Service from "../appwrite/config";
import { useSelector } from "react-redux";
import { Link } from "react-router"; // Fixed import

const CommentSection = ({ postId, username }) => {
  const user = useSelector((state) => state.auth.userData);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch comments with error handling
  const fetchComments = async () => {
    try {
      setLoading(true);
      const fetchedComments = await Service.getPostComments(postId);
      setComments(fetchedComments);
      setError(null);
    } catch (error) {
      console.error("Error fetching comments:", error);
      // Only show error to logged-in users
      if (user) {
        setError("Failed to load comments. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchComments();
  }, [postId]);

  // Add comment handler
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const addedComment = await Service.addComment(
        postId,
        user.$id,
        newComment,
        username
      );
      setComments((prev) => [addedComment, ...prev]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to add comment. Please try again.");
    }
  };

  // Delete comment handler
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    
    try {
      await Service.deleteComment(commentId);
      setComments(prev => prev.filter(c => c.$id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Failed to delete comment');
    }
  };

  return (
    <div className="pt-12 border-t">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h3 className="mb-6 text-2xl font-bold text-gray-800">
            Discussion {!loading && `(${comments.length})`}
          </h3>

          {/* Comment Input - Only show when logged in */}
          {user ? (
            <div className="mb-8">
              <div className="flex flex-col gap-4">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write your comment..."
                  className="w-full px-4 py-3 transition-all border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleAddComment}
                    className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                    disabled={!newComment.trim()}
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 mb-8 text-center rounded-lg bg-gray-50">
              <p className="text-gray-600">
                <Link to="/login" className="text-blue-600 hover:underline">
                  Sign in
                </Link> to participate in the discussion
              </p>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-6">
            {loading ? (
              <div className="py-8 text-center">
                <div className="animate-pulse">
                  <div className="w-full h-8 mb-4 bg-gray-200 rounded"></div>
                  <div className="w-3/4 h-8 mx-auto bg-gray-200 rounded"></div>
                </div>
              </div>
            ) : error ? (
              <div className="p-4 text-center text-red-600 rounded-lg bg-red-50">
                {error}
              </div>
            ) : comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.$id} className="flex gap-4 p-4 transition-colors rounded-lg group bg-gray-50 hover:bg-gray-100">
                  <div className="flex-shrink-0">
                    <Link to={`/profile/${comment.username}`}>
                      <div className="flex items-center justify-center w-10 h-10 font-medium text-white bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700">
                        {comment.username?.[0]?.toUpperCase() || "U"}
                      </div>
                    </Link>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Link 
                          to={`/profile/${comment.username}`}
                          className="font-semibold text-gray-800 hover:text-blue-600 hover:underline"
                        >
                          {comment.username || "Anonymous"}
                        </Link>
                        <span className="text-sm text-gray-500">
                          {new Date(comment.$createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      
                      {/* Show delete button only for authorized users */}
                      {user && (user.$id === comment.userId || user?.isAdmin) && (
                        <button
                          onClick={() => handleDeleteComment(comment.$id)}
                          className="p-1 text-gray-400 transition-colors hover:text-red-600"
                          title="Delete comment"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                    <p className="leading-relaxed text-gray-700">{comment.text}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="mt-2 text-gray-500">No comments yet. Be the first to share your thoughts!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;