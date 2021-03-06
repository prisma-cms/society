
import { PureComponent } from 'react'

import gql from "graphql-tag";

import Context from '@prisma-cms/context';

export default class SubscriptionProvider extends PureComponent {


  static contextType = Context;


  state = {
    subscriptions: [],
  }


  componentDidMount() {

    this.subscribe();

  }

  componentWillUnmount() {

    this.unsubscribe();

  }


  async subscribe() {

    const {
      client,
      // user: currentUser,
    } = this.context;

    // const {
    //   id: currentUserId,
    // } = currentUser || {};


    if (!client) {
      console.error("client is empty");
      return;
    }

    await this.unsubscribe();


    let {
      subscriptions,
    } = this.state;


    const subscribeChatRoom = gql`
      subscription chatRoom{
        chatRoom{
          mutation
          node{
            id
          }
        }
      }
    `;

    const chatRoomSub = await client
      .subscribe({
        query: subscribeChatRoom,
        variables: {
        },
      })
      .subscribe({
        next: async (data) => {

          await this.reloadData();

        },
        error(error) {
          console.error('subscribeCalls callback with error: ', error)
        },
      });


    subscriptions.push(chatRoomSub);


    const subscribeChatMessage = gql`
      subscription chatMessage{
        chatMessage{
          mutation
          node{
            id
          }
        }
      }
    `;

    const chatMessageSub = await client
      .subscribe({
        query: subscribeChatMessage,
        variables: {
        },
      })
      .subscribe({
        next: async (data) => {

          await this.reloadData();

        },
        error(error) {
          console.error('subscribeCalls callback with error: ', error)
        },
      });


    subscriptions.push(chatMessageSub);


    // if (currentUserId) {

    const subscribeNotice = gql`
        subscription notice{
          notice{
            mutation
            node{
              id
            }
          }
        }
      `;

    const noticeSub = await client
      .subscribe({
        query: subscribeNotice,
        variables: {
        },
      })
      .subscribe({
        next: async (data) => {

          await this.reloadData();

        },
        error(error) {
          console.error('subscribeCalls callback with error: ', error)
        },
      });


    subscriptions.push(noticeSub);

    // }



    this.setState({
      subscriptions,
    });

  }


  unsubscribe() {


    return new Promise((resolve) => {

      const {
        subscriptions,
      } = this.state;

      if (subscriptions && subscriptions.length) {


        subscriptions.map(n => {
          n.unsubscribe();
          return null;
        });

        Object.assign(this.state, {
          subscriptions: [],
        });

        return null;

      }

      resolve();

    });

  }


  async reloadData() {

    const {
      client,
      // loadApiData,
    } = this.context;

    // await loadApiData();

    // await client.reFetchObservableQueries();


    if (!client.queryManager.fetchQueryRejectFns.size) {

      // console.log("client", client);

      return await client.resetStore()
        .catch(error => {
          console.error(error);
        });

    }

  }


  render() {

    const {
      children,
      // user,
      // client,
      // loadApiData,
      // ...other
    } = this.props;

    return children;

    // return children ? <children.type
    //   {...children.props}
    //   {...other}
    // /> : null;

  }

}