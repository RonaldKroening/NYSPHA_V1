import React, {Fragment, Component} from "react";
import {Typography, Paper, Chip} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import axios from "axios";
import "./event_list.css";
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    overrides: {
        MuiChip: {
            root: {
                padding: '3px 4px',
                fontFamily: "'Roboto', sans-serif",
                fontSize: "17px"
            },
        },
    },
});
console.log("hello from elist");
class Events extends Component {
	state = {
		events: [],
	};
	//Fetching all the events which are active
	componentDidMount() {
		axios
			.get(process.env.REACT_APP_EVENTS)
			.then((response) => {
			console.log("have response in event_list.js!");
			console.log(response.data).
				// handle success
				this.setState({
					events: response.data
				});
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			})
			.then(function () {
				// always executed
				console.log("e list line 42");
			});
	}

	render() {
		return (
			<Fragment>
				<div className="container">
					<div className="header">
						<Typography variant="h4" className="form-title">
							Events List
						</Typography>
					</div>
					<Paper elevation={5} className="mainContainer" color="primary.main">
						<div className="flexContainer">
							{this.state.events.map((event, index) => (
								<Fragment>
									<div className="cardEvent">
										<div className="cardImage">
											<img src={event.imageURL} alt="Avatar" />
										</div>
										<NavLink
											to={{
												pathname: "/form",
												state: {
													text: `${event.message}`,
													head: `${event.name}`,
													message: `${event.issueText}`,
													jurisdiction: `${event.jurisdiction}`
												},
											}}
											style={{textDecoration: "none", color: "inherit"}}>
											<div className="chipDetail">
												<ThemeProvider theme={theme}>
												<Chip label={event.jurisdiction} size="medium" color={event.jurisdiction === "state" ? "primary" : "secondary"}/>
												</ThemeProvider>
											</div>
											<div className="cardDetail">
												<h4>{"youuuu"}</h4>
												<p>{event.issueText}</p>
											</div>
										</NavLink>
									</div>
								</Fragment>
							))}
						</div>
					</Paper>
				</div>
			</Fragment>
		);
	}
}

export default Events;
