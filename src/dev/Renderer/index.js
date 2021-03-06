import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";

import "moment/locale/ru";

import App, {
  ContextProvider,
  SubscriptionProvider,

  ChatRooms,
  ChatRoom,
  CreateChatRoom,

  ChatMessages,
  ChatMessage,
} from "../../App";

import { Renderer as PrismaCmsRenderer } from '@prisma-cms/front'
import Context from '@prisma-cms/context'

import MainMenu from './MainMenu';
import UserPage from '@prisma-cms/front/lib/components/pages/UsersPage/UserPage';
import withStyles from 'material-ui/styles/withStyles';

import * as queryFragments from "../../schema/generated/api.fragments";
import DevMainPage from './pages/MainPage';


export const styles = {
  root: {
    fontSize: 16,
    fontFamily: "serif",
    height: "100%",
    // border: "1px solid red",
    display: "flex",
    flexDirection: "column",

    "& #Renderer--body": {
      flex: 1,
      // border: "1px solid blue",
      overflow: "auto",

      "& a": {
        "&, & span": {
          color: "#0369ce",
        },
      },
    },
  },
}


class DevRenderer extends PrismaCmsRenderer {


  static propTypes = {
    ...PrismaCmsRenderer.propTypes,
    pure: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    ...PrismaCmsRenderer.defaultProps,
    pure: false,
  }


  getRoutes() {

    const {
      getQueryFragment,
    } = this.context;

    let routes = super.getRoutes();

    return [
      {
        exact: true,
        path: "/",
        component: DevMainPage,
      },
      {
        exact: true,
        path: "/chat-rooms",
        component: ChatRooms,
      },
      {
        exact: true,
        path: "/chat-rooms/create",
        component: CreateChatRoom,
      },
      {
        exact: true,
        path: "/chat-rooms/:id",
        render: props => {

          const {
            match: {
              params: {
                id,
              },
            },
          } = props;

          return <ChatRoom
            key={id}
            where={{
              id,
            }}
            {...props}
          />
        },
      },
      {
        exact: true,
        path: "/chat-messages",
        component: ChatMessages,
      },
      {
        exact: true,
        path: "/chat-messages/:id",
        render: props => {

          const {
            match: {
              params: {
                id,
              },
            },
          } = props;

          return <ChatMessage
            key={id}
            where={{
              id,
            }}
            {...props}
          />
        },
      },
      {
        exact: true,
        path: "/users/:userId",
        render: (props) => {
          const {
            params,
          } = props.match;

          const {
            userId,
          } = params || {};

          return <UserPage
            key={userId}
            getQueryFragment={getQueryFragment}
            where={{
              id: userId,
            }}
            {...props}
          />
        }
      },
      // {
      //   path: "*",
      //   render: props => this.renderOtherPages(props),
      // },
    ].concat(routes);

  }


  renderMenu() {

    return <MainMenu />
  }


  renderWrapper() {

    return <Context.Consumer>
      {context => {

        return <Context.Provider
          value={Object.assign(context, this.context, {
            queryFragments,
          })}
        >
          {this.renderMenu()}

          <ContextProvider>
            <SubscriptionProvider>
              {super.renderWrapper()}
            </SubscriptionProvider>
          </ContextProvider>
        </Context.Provider>
      }}
    </Context.Consumer>
  }


  render() {

    const {
      pure,
      classes,
      ...other
    } = this.props;

    return <Fragment>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            html, body, #root {
              height: 100%;
            }
          `,
        }}
      />
      <div
        className={classes.root}
      >
        {pure ? <App
          {...other}
        /> : super.render()}
      </div>
    </Fragment>;

  }

}

export default withStyles(styles)(props => <DevRenderer
  {...props}
/>);