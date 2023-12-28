import { useEffect } from "react";
import { useRouter } from "next/router";
import { listByUser } from "../../media/apiPost.js";
import { isAuthenticated } from "../../users/apiUsers.js";
import Link from "next/link";
import VideoThumbnail from "react-thumbnail-player";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import { makeStyles } from "@material-ui/core/styles";

const url = "http://localhost:8000";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100vh",
    maxWidth: 360,
    backgroundColor: "#212121",
    position: "relative",
    overflow: "auto",
    // maxHeight: 300,
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    marginBottom: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

const Profile = (props) => {
  const classes = useStyles();

  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, []);
  const generateList = () => {
    const allVideos = props.videos.map((video) => {
      return (
        <div className="hovering mb-2" style={{ width: "300px" }}>
          <Link key={video._id} href={`/medias/${video._id}`}>
            <Grid item xs>
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
            </Grid>
          </Link>
        </div>
      );
    });
    return allVideos;
  };
  return (
    <div className="overflow-hidden">
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <List className={classes.root} subheader={<li />}>
            <ul className={classes.ul}>
              <ListSubheader>
                <Link className="nav-link" href={`/`}>
                  <ListItemText primary={`Home`} />
                </Link>
              </ListSubheader>
              <ListItem>
                {isAuthenticated() && (
                  <Link
                    className="nav-link"
                    href={`/user/${isAuthenticated().user._id}`}
                  >
                    <ListItemText primary={`Your Videos`} />
                  </Link>
                )}
              </ListItem>
            </ul>
            {isAuthenticated() && (
              <Link
                className="nav-link"
                href={`/user/${isAuthenticated().user._id}`}
              >
                {isAuthenticated().user.username}
              </Link>
            )}
          </List>
        </Grid>
        <Grid item xs={10}>
          <h3>My Videos</h3>
          <div className="row">{generateList()}</div>
        </Grid>
      </Grid>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const res = await listByUser(ctx.query.id);
  return { props: { videos: res.data } };
};

export default Profile;
