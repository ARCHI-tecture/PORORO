import React from 'react';
import styled from 'styled-components';
import { Modal, Box, TextField, Button } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const ModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 260px;
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 24;
`;

interface TodoModalProps {
  open: boolean;
  onClose: () => void;
  editingText: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onDelete: () => void;
}

const ButtonModal: React.FC<TodoModalProps> = ({
  open,
  onClose,
  editingText,
  onChange,
  onSave,
  onDelete,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalBox>
        <TextField
          value={editingText}
          onChange={onChange}
          variant="standard"
          fullWidth
        />
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button
            startIcon={<EditIcon />}
            onClick={onSave}
            color="primary"
            variant="contained"
          >
            수정하기
          </Button>
          <Button
            startIcon={<DeleteIcon />}
            onClick={onDelete}
            color="error"
            variant="contained"
          >
            삭제하기
          </Button>
        </Box>
      </ModalBox>
    </Modal>
  );
};

export default ButtonModal;
