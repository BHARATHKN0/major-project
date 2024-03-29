
// import DP from '../../../Assets/dp.jpg'

import { useState, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled } from '@mui/material';
import { DataContext } from '../../../context/DataProvider';
import { API } from '../../../service/api'


const Container = styled(Box)`
    margi-top: 100px;
    display: flex;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
});

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px;
    width: 100%;
    margin: 0 20px;
`

const initialValues = {
    name: '',
    postId: '',
    comments: '',
    date: new Date()
}


export const Comments = ({ post }) => {

    const url = 'https://static.thenounproject.com/png/12017-200.png'

    const [ comment, setComment ] = useState(initialValues);

    const { account } = useContext(DataContext);

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments:e.target.value
        });
    }

    const addComment = async (e) => {
        let response = await API.newComment(comment);
        if (response.isSuccess) {
            setComment(initialValues);
        }
    }

    return (
        <Box>
            <Container>
                <Image src={url} alt='dp' />
                <StyledTextArea 
                    minRows={5}
                    placeholder='Share your experience'
                    value={comment.comments}
                    onChange={(e) => handleChange(e)}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    size="medium" 
                    style={{ height: 40 }} 
                    onClick={(e) => addComment(e)}>
                Post</Button>
            </Container>

            <Box>

            </Box>
        </Box>
        // <div>This is comments</div>
    )
}


export default Comments;