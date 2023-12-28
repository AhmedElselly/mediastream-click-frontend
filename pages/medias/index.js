import { list } from "../../media/apiPost";
import { isAuthenticated } from "../../users/apiUsers";

import Grid from "@mui/material/Unstable_Grid2";
import { List, ListItem, ListItemText, ListSubheader } from "@mui/material";

import Link from "next/link";
const url = "http://localhost:8000";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//     height: "100vh",
//     maxWidth: 360,
//     backgroundColor: "#212121",
//     position: "relative",
//     overflow: "auto",
//     // maxHeight: 300,
//   },
//   listSection: {
//     backgroundColor: "inherit",
//   },
//   ul: {
//     backgroundColor: "inherit",
//     padding: 0,
//   },
//   container: {
//     display: "grid",
//     gridTemplateColumns: "repeat(12, 1fr)",
//     gridGap: theme.spacing(3),
//   },
//   paper: {
//     padding: theme.spacing(1),
//     textAlign: "center",
//     color: theme.palette.text.secondary,
//     whiteSpace: "nowrap",
//     marginBottom: theme.spacing(1),
//   },
//   divider: {
//     margin: theme.spacing(2, 0),
//   },
// }));

const Medias = (props) => {
  //   const classes = useStyles();

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
          <List subheader={<li />}>
            <ul>
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
          <h3>Videos</h3>
          <div className="row">{generateList()}</div>
        </Grid>
      </Grid>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const res = await list();
  return { props: { videos: res.data } };
};

export default Medias;
