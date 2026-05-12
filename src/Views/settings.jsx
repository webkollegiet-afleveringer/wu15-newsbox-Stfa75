
import Settings from "../Components/Settings"
import "./settings.scss"

// 1. Tag imod props her (isDark og onToggle)
export default function SettingsPanel({ isDark, onToggle }) {

    return (
        <>
            <h2 className="Overskrift1">Settings</h2>
            <br />
            {/* 2. SEND dem videre til komponenten her */}
            <Settings isDark={isDark} onToggle={onToggle} />
        </>
    )
}