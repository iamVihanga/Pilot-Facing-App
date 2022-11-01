import React, { useState } from 'react'
import { skillsList } from "../../utils/registerationData";

const UpdateSkills_Card = ({ skills, setSkills }) => {
    const [showMenu, setShowMenu] = useState(false)
    const [selectedSkill, setSelectedSkill] = useState(null)

    // Filter menu items for exclude already added skills
    var filteredSkillsList = skillsList.filter(function (o1) {
        return !skills.some(function (o2) {
            return o1.id === o2.id; // return the ones with equal id
        });
    });

    const addSkill = () => {
        if (selectedSkill !== null) setSkills([...skills, selectedSkill])
        setSelectedSkill(null)
    }

    return (
        <div className="mt-2 w-full min-h-32 p-2 pb-4 rounded bg-primaryBlueLight relative">
            {/* input container */}
            <div className="flex items-center gap-2">
                <div onClick={() => setShowMenu(!showMenu)} className="flex-1 cursor-pointer flex items-center justify-between border border-primaryBlue p-2 rounded-md">
                    <p className="text-xs text-primaryBlue">{selectedSkill ? selectedSkill.text : 'Select Capabilities'}</p>
                    <svg className='w-4 h-4 mt-[-6px] text-gray-400' fill='#2263DF' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z" />
                    </svg>
                </div>

                <button onClick={addSkill} className='bg-primaryBlue text-white text-sm px-5 h-full py-2 rounded-md'>Add</button>
            </div>

            {/* Menu */}
            {showMenu && (
                <div className="absolute z-[100] w-[83%] rounded-md shadow-xl mt-[.5] px-3 py-2 bg-white">
                    {filteredSkillsList.map(skill =>
                        <p
                            key={skill.id}
                            onClick={() => {
                                setSelectedSkill({ id: skill.id, text: skill.text })
                                setShowMenu(false)
                            }}
                            className="dropdown-menu-item text-xs"
                        >{skill.text}</p>
                    )}
                </div>
            )}

            {/* Items container */}
            <div className="mt-3 flex flex-wrap gap-3 items-start">
                {skills.map(skill => (
                    <p className="badge" key={skill.id}>{skill.text}</p>
                ))}
            </div>
        </div>
    )
}

export default UpdateSkills_Card