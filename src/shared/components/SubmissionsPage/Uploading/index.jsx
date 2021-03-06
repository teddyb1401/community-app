import React from 'react';
import PT from 'prop-types';
import { Link } from 'react-router-dom';
import RobotHappy from 'assets/images/robot-happy.svg';
import RobotSad from 'assets/images/robot-embarassed.svg';
import { PrimaryButton, Button } from 'components/buttons';
import './styles.scss';

const Uploading = ({
  challengeId,
  challengeName,
  challengesUrl,
  error,
  isSubmitting,
  submitDone,
  reset,
  retry,
  track,
  uploadProgress,
}) => (
  <div styleName="container">
    <div styleName="uploading">
      {
        isSubmitting &&
          <h3>UPLOADING SUBMISSION FOR</h3>
      }
      {
        submitDone &&
        <h3>SUBMISSION COMPLETED FOR</h3>
      }
      {
        error &&
          <h3>ERROR SUBMITTING FOR</h3>
      }
      {
        isSubmitting &&
          <h3>{'"'}{challengeName }{'"'}</h3>
      }
      {
        (submitDone || error) &&
          <Link to={`${challengesUrl}/${challengeId}`}>{challengeName }</Link>
      }
      {
        (isSubmitting || submitDone) &&
          <RobotHappy />
      }
      {
        error &&
          <RobotSad />
      }
      {
        isSubmitting && !submitDone &&
          <p styleName="submitting">Uploaded: {(100 * uploadProgress).toFixed()}%</p>
      }
      {
        isSubmitting &&
          <p>Hey, your work is AWESOME! Please don&#39;t close this window while I&#39;m
            working, you&#39;ll lose all files!
          </p>
      }
      {
        error &&
          <p>Oh, that’s embarrassing! The file couldn’t be
             uploaded, I’m so sorry.
          </p>
      }
      {
        error &&
          <div styleName="error-msg">
            {error}
          </div>
      }
      {
        error &&
          <div styleName="button-container">
            <Button
              onClick={() => reset()}
            >Cancel</Button>
            <PrimaryButton
              onClick={() => retry()}
            >Try Again</PrimaryButton>
          </div>
      }
      {
        submitDone && !error &&
          <p>Thanks for participating! We’ve received your submission and will
            send you an email shortly to confirm and explain what happens next.
          </p>
      }
      {
        submitDone && !error &&
          <div styleName="button-container">
            { track === 'DESIGN' ? (
              <span>
                <Button
                  onClick={() => reset()}
                >Add Another Submission</Button>
                <PrimaryButton
                  to={`${challengesUrl}/${challengeId}/my-submissions`}
                >View My Submissions</PrimaryButton>
              </span>
            ) : (
              <span>
                <Button
                  onClick={() => reset()}
                >Submit Again</Button>
                <PrimaryButton
                  to={`${challengesUrl}/${challengeId}`}
                >Back to Challenge</PrimaryButton>
              </span>
            )}
          </div>
      }
    </div>
  </div>
);

Uploading.propTypes = {
  challengeId: PT.number.isRequired,
  challengeName: PT.string.isRequired,
  challengesUrl: PT.string.isRequired,
  isSubmitting: PT.bool.isRequired,
  submitDone: PT.bool.isRequired,
  reset: PT.func.isRequired,
  error: PT.string.isRequired,
  track: PT.string.isRequired,
  retry: PT.func.isRequired,
  uploadProgress: PT.number.isRequired,
};

export default Uploading;
