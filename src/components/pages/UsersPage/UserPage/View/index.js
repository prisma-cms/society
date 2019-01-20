import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UserPageViewProto from "@prisma-cms/front/lib/modules/pages/UsersPage/UserPage/View";

import { ChatRooms } from '../../../../../App';

import { Widget } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';

class UserPageView extends UserPageViewProto {


  getWalletAddress() {

    const object = this.getObjectWithMutations();

    let {
      ethWallet,
    } = object;

    const {
      address,
    } = this.getEthAccount() || {}

    return ethWallet || address;
  }


  getEthAccount() {

    const object = this.getObjectWithMutations();

    let {
      EthAccounts,
    } = object;

    return EthAccounts && EthAccounts[0] || null;

  }


  renderChatWidget() {

    // return <Widget
    //   handleNewUserMessage={(message) => {
    //     console.log("New message", message);
    //   }}
    // />;

    return null;

  }


  renderDefaultView() {

    const object = this.getObjectWithMutations();
    const inEditMode = this.isInEditMode();

    let {
      id: userId,
    } = object;

    const {
      mutate,
    } = this.props;

    const {
      user: currentUser,
      Grid,
    } = this.context;


    const {
      id: currentUserId,
    } = currentUser || {}

    // const ethWallet = this.getWalletAddress();

    let widget = this.renderChatWidget();

    return <Grid
      container
      spacing={16}
    >

      <Grid
        item
      >

        {this.renderAvatar()}

      </Grid>

      <Grid
        item
        xs
      >

        <Grid
          container
          spacing={16}
        >

          <Grid
            item
            xs={12}
          // md={6}
          >

            <ChatRooms
              user={object}
              currentUser={currentUser}
            />


          </Grid>



          {widget ?
            <Grid
              item
              xs={12}
              md={6}
            >

              {widget}

            </Grid>
            : null
          }

        </Grid>

      </Grid>



    </Grid>;

  }

  renderEditableView() {


    // return <UserView 
    //   {...this.props}
    // />

    const object = this.getObjectWithMutations();
    const inEditMode = this.isInEditMode();

    const {
      id,
      username,
      fullname,
    } = object;


    const {
      mutate,
    } = this.props;

    const {
      user: currentUser,
      Grid,
    } = this.context;


    const {
      changePassword,
    } = this.state;

    const {
    } = currentUser || {}

    const ethWallet = this.getWalletAddress();

    return <Grid
      container
      spacing={16}
    >

      <Grid
        item
      >

        {this.renderAvatar()}

      </Grid>

      <Grid
        item
        xs
      >

        <Grid
          container
          spacing={16}
        >

          <Grid
            item
            xs={12}
            md={6}
          >


            <Grid
              item
              xs={12}
            >

              {this.getTextField({
                name: "ethWallet",
                helperText: "Сменить ethereum кошелек",
                label: "Адрес кошелька",
                value: ethWallet || "",
              })}

            </Grid>


            <Grid
              item
              xs={12}
            >

              {this.getTextField({
                name: "fullname",
                helperText: "Отображаемое на сайте имя",
                label: "Имя",
              })}

            </Grid>


            <Grid
              item
              xs={12}
            >

              <input
                style={{
                  height: 1,
                  opacity: 1,
                  padding: 0,
                  margin: 0,
                  border: 0,
                }}
              />

              <div>
                {this.getTextField({
                  name: "password",
                  type: "password",
                  label: "Пароль",
                  helperText: "Новый пароль",
                })}
              </div>

            </Grid>


            <Grid
              item
              xs={12}
            >

              {this.getTextField({
                name: "email",
                helperText: "Сменить емейл",
                label: "Емейл",
              })}

            </Grid>

          </Grid>

          <Grid
            item
            xs={12}
            md={6}
          >


          </Grid>

        </Grid>

      </Grid>



    </Grid>;

  }

}


export default UserPageView;