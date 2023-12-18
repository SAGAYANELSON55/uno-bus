import React from 'react'
import { CircularProgress } from '@mui/material';
import style from './loader.module.css'

const Loader = () => {
  return (
    <div className={style.loader}>
          <CircularProgress />
        </div>
  )
}

export default Loader;