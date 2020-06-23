import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { updateUser } from "../../actions/auth";

import Container from "../../components/UI/Container";
import Headline from "../../components/UI/Headline";
import Paragraph from "../../components/UI/Paragraph";
import Spinner from "../../components/Spinner";
import UserForm from "./components/UserForm";

const UserPage = ({ auth: { user }, updateUser }) => {
  const onUserSubmit = (about, avatar) => {
    const data = {
      about,
      avatar,
    };

    updateUser(data);
  };

  return user === null ? (
    <Spinner />
  ) : (
    <Container>
      <Headline title="User Page" as="h2" />
      <Paragraph>Welcome, {user && user.name}!</Paragraph>
      <UserForm onSubmit={onUserSubmit} user={user} />
    </Container>
  );
};

UserPage.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { updateUser })(UserPage);