import React from 'react'
import styles from './NotFound.module.scss'
import { Button } from "react-bootstrap";
import { NavLink } from 'react-router-dom'

function NotFound() {
  return (
    <div className={styles.Container}>
      <div className="text-center">
        <h1 className={styles.Status}>404</h1>
        <h2 className={styles.Message}>Not Found</h2>
        <Button
          as={NavLink}
          to={"/"}
          variant="primary"
          className={styles.button}
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  )
}

export default NotFound
