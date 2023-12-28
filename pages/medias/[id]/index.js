import { useState, useEffect } from "react";
import { getVideo, listRelated, read } from "../../../media/apiPost";
import { isAuthenticated } from "../../../users/apiUsers";
import {
  createComment,
  listComments,
  updateComment,
} from "../../../media/apiComments";
import Link from "next/link";
import MediaPlayer from "../../../media/MediaPlayer";
import { Button, Paper } from "@mui/material";
import {Grid} from "@mui/material/Unstable_Grid2";

const url = "http://localhost:8000";

const Media = (props) => {
  const [user, setUser] = useState({});
  const [comments, setComments] = useState(props.comments);
  const [editMode, setEditMode] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (isAuthenticated()) {
      setUser(isAuthenticated());
    }
  }, []);

  const handleEditComment = (e) => {
    e.preventDefault();
    setEditMode(!editMode);
  };

  const handleChangeText = (e) => {
    setText(e.target.value);
  };

  const handleUpdateComment = (e) => {
    e.preventDefault();
    updateComment().then((res) => {});
  };

  const listRelatedVideos = () => {
    return props.related.map((video) => {
      return (
        <div className="hovering mb-2">
          <Link
            className="nav-link"
            key={video._id}
            href={`/medias/${video._id}`}
          >
            <VideoThumbnail
              title={video.title}
              message={`${video.views} views`}
              preview={`${url}/media/video/${video._id}`}
              width={"100%"}
              muted={true}
              badge={video.genre}
              badgeBg="red"
              classname="height-video"
            />
          </Link>
        </div>
      );
    });
  };

  const listingComments = () => {
    return comments.map((comment) => {
      return (
        <div>
          <Paper style={{ padding: "40px 20px" }}>
            <Grid container wrap="nowrap" spacing={2}>
              {editMode ? (
                <div className="mb-5">
                  <form className="form-group" onSubmit={handleUpdateComment}>
                    <textarea
                      className="form-control"
                      name="text"
                      onChange={handleChangeText}
                      cols="30"
                      rows="10"
                    ></textarea>
                    <Button
                      variant="contained"
                      onClick={handleUpdateComment}
                      color="secondary"
                    >
                      Update
                    </Button>
                  </form>
                </div>
              ) : (
                <Grid justifyContent="left" item xs zeroMinWidth>
                  <h4 style={{ margin: 0, textAlign: "left" }}>
                    {comment.author.username}
                  </h4>
                  <p style={{ textAlign: "left" }}>{comment.text}. </p>
                  <p style={{ textAlign: "left", color: "gray" }}>
                    {comment.createdAt ? comment.createdAt : "1 minute ago"}
                  </p>
                </Grid>
              )}
            </Grid>
            <Grid item>
              {isAuthenticated() &&
                isAuthenticated().user._id === comment.author._id && (
                  <div>
                    {!editMode && (
                      <Button
                        variant="contained"
                        onClick={handleEditComment}
                        color="secondary"
                      >
                        <EditIcon />
                      </Button>
                    )}
                  </div>
                )}
            </Grid>
            <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
          </Paper>
        </div>
      );
    });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    createComment().then((res) => {
      console.log(res.data);
    });
  };

  const nextUrl =
    props.related.length > 0 ? `medias/${props.related[0]._id}` : "";
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          <MediaPlayer
            title={props.video.title}
            nextUrl={nextUrl}
            srcUrl={`http://localhost:8000/media/video/${props.videoId}`}
          />
          <h3>Comments</h3>
          <form className="form-group" onSubmit={handleCommentSubmit}>
            <textarea
              className="form-control"
              name="text"
              id=""
              cols="30"
              rows="10"
            ></textarea>
            <Button variant="contained" color="secondary">
              Comment
            </Button>
          </form>
          {listingComments()}
        </div>
        <div className="col-md-4">
          <h3>Related Videos</h3>
          {listRelatedVideos()}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const videoId = await ctx.query.id;
  const media = await read(videoId);
  const comments = await listComments(videoId);
  const resRelated = await listRelated(ctx.query.id);
  return {
    props: {
      videoId,
      related: resRelated.data,
      video: media.data,
      comments: comments.data.comments,
    },
  };
};

export default Media;
