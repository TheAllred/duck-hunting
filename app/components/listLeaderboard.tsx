
type leaderboardList = {
    boardEntry : {
        username: string
        count: number
    }[]
}


export function ListLeaderboard(props: leaderboardList) {
    return (
        <div>
        {props.boardEntry.map(item => {
            return(
                <ul>
                    <li>{item.username} : {item.count}</li>
                </ul>
            )
        })}
    </div>
    )
    
}