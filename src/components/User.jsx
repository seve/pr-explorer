import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import styled from 'styled-components/macro';

import 'react-datepicker/dist/react-datepicker.css';


import query from '../graphql/queries';

const StyledUser = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 40vw;
  text-align: center;
`;

export default class User extends Component {
  constructor(props) {
    super(props);

    const { nodeID, index } = props.match.params;


    const userName = props.users[index].reduce((accum, user) => {
      if (user.node_id == nodeID) {
        return user.name;
      }
      return accum;
    }, '');


    this.state = {
      nodeID,
      userName,
      startDate: new Date('2018-01-01'),
      endDate: new Date(),
    };

    // this.canvas = React.createRef();
  }


  drawPie(pieData) {
    if (this.canvas) {
      const ctx = this.canvas.getContext('2d');
      let lastAngle = 0;

      Object.entries(pieData).forEach((value) => {
        let color;
        switch (value[0]) {
          case 'MERGED':
            color = '#5A8463';
            break;
          case 'OPEN':
            color = '#FCC654';
            break;
          case 'CLOSED':
            color = '#C32932';
            break;
          default:
            color = '#fff';
        }
        if (color !== '#fff') {
          ctx.beginPath();
          const val = (value[1] / pieData.TOTAL) * 2 * Math.PI;
          ctx.arc(100, 100, 50, lastAngle, lastAngle + val);
          ctx.lineWidth = 100;
          ctx.strokeStyle = color;
          ctx.stroke();
          lastAngle += val;
        }
      });
    }
  }

  handleChangeEnd(date) {
    this.setState({
      endDate: date,
    });
  }

  handleChangeStart(date) {
    this.setState({
      startDate: date,
    });
  }

  render() {
    const { state, props } = this;
    const { index } = props.match.params;
    return (
      <StyledUser>
        <Link to={`/huddle/${index}`}>Back</Link>

        <Query {...{ query }} variables={{ users: state.nodeID }}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) {
              console.log(error);

              return <p>Error :(</p>;
            }
            const user = data.nodes[0];
            const validPRs = user.pullRequests.nodes.filter(pr => new Date(pr.createdAt) <= state.endDate
               && new Date(pr.createdAt) >= state.startDate);


            const prStatus = validPRs.reduce((val, pr) => {
              const ret = val;
              ret[pr.state] += 1;
              ret.TOTAL += 1;
              return ret;
            }, {
              MERGED: 0,
              OPEN: 0,
              CLOSED: 0,
              TOTAL: 0,
            });

            return (
              <>
                <h2>{state.userName}</h2>
                <div>
                  <DatePicker
                    selected={state.startDate}
                    selectsStart
                    startDate={state.startDate}
                    endDate={state.endDate}
                    onChange={date => this.handleChangeStart(date)}
                  />
                  <DatePicker
                    selected={state.endDate}
                    selectsEnd
                    startDate={state.startDate}
                    endDate={state.endDate}
                    onChange={date => this.handleChangeEnd(date)}
                  />
                </div>
                <h3>
                  Pull Requests(
                  {validPRs.length}
                  )
                </h3>
                <canvas ref={(c) => { this.canvas = c; this.drawPie(prStatus); }} width="200" height="200" />
                <div>
                  {validPRs.map(pullRequest => (
                    <a
                      key={pullRequest.createdAt}
                      target="_blank"
                      rel="noreferrer noopener"
                      href={pullRequest.permalink}
                    >
                      {pullRequest.createdAt}
                    </a>
                  ))}
                </div>
              </>

            );
          }}
        </Query>
      </StyledUser>
    );
  }
}
