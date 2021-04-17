import csrf from 'csurf';

export default csrf({cookie: {
    httpOnly: true,
}});