import React from 'react';
import useStyles from './styles';
import {Card,CardContent,CardMedia,Typography} from '@material-ui/core';
import moment from 'moment';
const Post = ({post})=>{
    const classes = useStyles();
    return(
            <Card className={classes.card}>
                <CardMedia className={classes.media} title={post.title} />
                <div className={classes.overlay}>
                    <Typography variant="h6">{post.companie[0].companyName}</Typography>
                </div>
                <div className={classes.details}>
                    <Typography variant="h6">{post.programmingLanguage}</Typography>
                </div>
                <CardContent>
                    <Typography className={classes.title} variant="h5" gutterBottom>{post.requirements}</Typography>
                </CardContent>
            </Card>
    );
}

export default Post;