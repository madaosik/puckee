import { MdSchedule, MdLocationPin, MdPeopleOutline, MdPerson } from 'react-icons/md'
import { FaHockeyPuck } from "react-icons/fa";
import { GiCrestedHelmet } from "react-icons/gi";
import { IGame } from "../../types"

export const GameExcerpt = (game: IGame) => {
    const startTime = new Date(game.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
    
    const gameLevel = [] as any;
    for(let i=0; i<6; i++) {
        if (i<game.exp_level) {
            gameLevel.push(<FaHockeyPuck size={24} color="black" key={game.id + ":level " + i}/>);
        } else {
            gameLevel.push(<FaHockeyPuck size={24} color="lightgrey" key={game.id + ":level " + i}/>);
        }
    }

    const goalies = [] as any;
    let i=0;
    if(game.goalies !== undefined) {
        game.goalies.forEach(g => {
            goalies.push(<GiCrestedHelmet size={24} color="#000000" key={game.id + ":goalie " + i}/>);
            i += 1;
        })
      }
    return (
      <section className="game-excerpt" key={game.id}>
        <h5>{game.name}</h5>
        {/* <div>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </div> */}
        <div className="game-attributes">
            <div className='row'>
                <div className='column'>
                    <p><span><MdSchedule/></span>{startTime}</p>
                    <p><span><MdLocationPin/></span>{game.location}</p>
                    <p><span><MdPerson/></span>{game.organizers[0].name}</p>
                </div>
                <div className='column'>
                    <p><span><MdPeopleOutline/></span><span>{game.players.length}/{game.total_places}</span></p>
                    <p><span>{goalies}</span></p>
                    <p><span>{gameLevel}</span></p>
                </div>
                <div className='detailColumn'>
                    <button type="button">Detail</button>
                </div>
            </div>
        </div>
        
        {/* <ReactionButtons post={post} />
        <Link to={`/posts/${post.id}`} classNameName="button muted-button">
          View Post
        </Link> */}
      </section>
    )
}

//   const filterDaysSections = (games) => {
//     const days = games
//       .map(e => e.start)
//       .map(Date.parse)
//     // days.forEach( (d) => {
//         // console.log(d.getDate());
//     // });
//     //   .map(d => format(d, "EEEE dd/MM/yyyy"));
    
//     // console.log(days);
//     const uniqueDays = new Set(days);
//     const sections = [];
    
//     uniqueDays.forEach((d) => {
//         // console.log(d.start)
//       const section = {
//         title: d,
//         data: games.filter(e => Date.parse(e.start) === d)
//         // data: games.filter(e => format(Date.parse(e.startTime), "EEEE dd/MM/yyyy") === d)
//       };
//       sections.push(section);
//     });
  
//     return sections;
//   }