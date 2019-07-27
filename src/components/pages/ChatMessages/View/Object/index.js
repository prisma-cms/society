import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EditableView from "../../../../view/Object/Editable";

import Paper from 'material-ui/Paper';
import withStyles from 'material-ui/styles/withStyles';

import SendIcon from "material-ui-icons/Send";
// import LinkIcon from "material-ui-icons/Link";
import moment from "moment";
import Typography from 'material-ui/Typography';
import gql from 'graphql-tag';

export const styles = theme => {

  return {
    root: {
      // border: "1px solid blue",
      // height: "100%",
      // display: "flex",
      // flexDirection: "column",
      padding: 10,

      "& .DraftEditor-root": {

        "& .public-DraftEditor-content": {

          "&[contenteditable=true]": {
            maxHeight: 250,
            overflow: "auto",
          },
        },
      },
    },
  }
}


export class ChatMessageView extends EditableView {


  static defaultProps = {
    ...EditableView.defaultProps,
    SaveIcon: SendIcon,
  }


  canEdit() {

    const {
      id,
      CreatedBy,
    } = this.getObjectWithMutations() || {}


    const {
      id: createdById,
    } = CreatedBy || {};

    const {
      id: currentUserId,
    } = this.getCurrentUser() || {};

    return !id || (currentUserId && currentUserId === createdById) ? true : false;
  }


  getTitle() {

    const {
      id,
    } = this.getObjectWithMutations() || {};

    return id;
  }


  renderHeader() {
    return null;
  }


  renderResetButton() {

    const {
      id,
    } = this.getObjectWithMutations();

    return id ? super.renderResetButton() : null;
  }


  renderDefaultView() {

    const {
      Grid,
      Editor,
      UserLink,
      ChatRoomLink,
      ChatMessageLink,
    } = this.context;

    const {
      classes,
    } = this.props;

    const {
    } = this.state;


    const object = this.getObjectWithMutations();

    const {
      id: objectId,
      content,
      createdAt,
      updatedAt,
      Room,
      CreatedBy,
    } = object;


    const inEditMode = this.isInEditMode();

    return <Paper
      className={classes.chat}
    >
      <Grid
        container
        spacing={16}
      >


        <Grid
          item
        >
          {CreatedBy ? <div
            style={{
              marginTop: 20,
            }}
          >
            <UserLink
              user={CreatedBy}
              showName={false}
            />
          </div> : null}
        </Grid>

        <Grid
          item
          xs
        >
          <Grid
            container
            spacing={8}
          >
            <Grid
              item
              xs={12}
            >
              <Grid
                container
                spacing={8}
                alignItems="flex-end"
              >
                <Grid
                  item
                >
                  {CreatedBy ? <UserLink
                    user={CreatedBy}
                    withAvatar={false}
                  /> : null}
                </Grid>
                <Grid
                  item
                >

                  <ChatMessageLink
                    object={object}
                  >
                    <Typography
                      color="textSecondary"
                    >
                      {createdAt && moment(createdAt).format("lll") || null}
                    </Typography>
                  </ChatMessageLink>

                </Grid>
                <Grid
                  item
                  xs
                >
                </Grid>
                <Grid
                  item
                >
                  {Room ? <ChatRoomLink
                    object={Room}
                  /> : null}
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
            >

              <Editor
                key={`${updatedAt}-${inEditMode}`}
                value={content}
                readOnly={!inEditMode}
                onChange={content => this.updateObject({
                  content,
                })}
              />
            </Grid>

          </Grid>
        </Grid>

        <Grid
          item
        >
          {this.getButtons()}
        </Grid>

      </Grid>
    </Paper>

  }

  renderEditableView() {

    return this.renderDefaultView();
  }


  componentDidMount() {

    /**
     * Когда сообщение загружено, 
     * надо его отметить прочитанным
     */

    const {
      user: currentUser,
      query: {
        markAsReadedChatMessage,
      },
      client,
    } = this.context;

    const {
      id: currentUserId,
    } = currentUser || {};

    if (currentUserId) {

      const {
        data: {
          object,
        },
      } = this.props;


      const {
        id,
        ReadedBy,
      } = object || {};

      if (id && ReadedBy && ReadedBy.findIndex(n => n.User.id === currentUserId) === -1) {

        client.mutate({
          mutation: gql(markAsReadedChatMessage),
          variables: {
            where: {
              id,
            },
          },
        });
      }

    }

    super.componentDidMount && super.componentDidMount();
  }


  render() {

    const {
      classes,
    } = this.props;

    return <div
      className={classes.root}
    >
      {super.render()}
    </div>
  }

}


export default withStyles(styles)(props => <ChatMessageView
  {...props}
/>);