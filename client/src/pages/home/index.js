import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { LiaRedoAltSolid } from "react-icons/lia";

import { generate } from 'silly-animal';

import useHomeControls from './hooks/useHomeControls';
import { useRoomRefs } from '../room/hooks/useRoomRefs';
import JoinRoomModal from '../../components/JoinRoomModal';
import Logo from '../../components/Logo';

import "./Home.css"

const Home = () => {
  const { userNameRef } = useRoomRefs()
  const { createRoom, joinRoom } = useHomeControls()

  const [joinRoomModalOpen, setJoinRoomModalOpen] = useState(false)
  const [userNameDraft, setUserNameDraft] = useState(userNameRef.current || generate('-'))
  
  const joinRoomHandler = (roomCode) => {
    joinRoom(
      userNameDraft,
      roomCode,
      (success) => {if (success) setJoinRoomModalOpen(false)})
  }

  return (
    <div className="homeContainer">
      <JoinRoomModal show={joinRoomModalOpen} handleClose={() => setJoinRoomModalOpen(false)} joinRoom={joinRoomHandler}/>
      <div className="logoControlsContainer">
        <Logo />  
        <div className="homeControlsContainer">
          <InputGroup>
            <Form.Control
              className="userNameInput"
              placeholder="Enter your name"
              value={userNameDraft}
              onChange={(e) => setUserNameDraft(e.target.value)}
              aria-describedby="regenerateUsernameButton"
            />
            <Button id="regenerateUsernameButton" onClick={() => setUserNameDraft(generate('-'))}>
              <LiaRedoAltSolid />
            </Button>
          </InputGroup>
          <InputGroup className="homeActionsButtonGroup">
            <Button onClick={() => createRoom(userNameDraft)} className="createRoomButton">
              Create Room
            </Button>
          </InputGroup>

          <InputGroup className="homeActionsButtonGroup">
            <Button onClick={() => setJoinRoomModalOpen(true)} className="joinRoomButton">
              Join Room
            </Button>
          </InputGroup>
        </div>
      </div>
    </div>
  )
}

export default Home