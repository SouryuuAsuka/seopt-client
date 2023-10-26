import { useState } from "react";
import { useAppSelector } from "@/hooks";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { ReactComponent as Logo } from "@/assets/images/logo.svg";



export function Header() {
  const generations = useAppSelector((state) => state.user.generations);
  return (
    <header>
      <div className="header__brand">
        <Logo />
      </div>
      <div className="header__text">
        <h2>Генератор <strong>уникальных текстов</strong> на базе нейросети ChatGPT</h2>
      </div>
      <div className="header__profile">
        Генераций: <span>{generations}</span>
      </div>
    </header>
  )

}
