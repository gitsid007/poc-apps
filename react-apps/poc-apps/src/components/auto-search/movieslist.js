const MoviesList = (props) => {
    const {list} = props;
    return (
            <ul>
                {list && list.map((v, i) => <li key={i}>{v.name}</li>)}
            </ul>
    );
}

export default MoviesList;