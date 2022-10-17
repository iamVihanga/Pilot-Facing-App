import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { completeForm, submitEquipmentForm } from "../../redux/registerSlice";
import { useForm } from "react-hook-form";
import { skills, droneEquipments } from "../../utils/registerationData";
import { useRouter } from "next/router";

const EquipmentsForm = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state.register)

    const router = useRouter()
    const { register, handleSubmit } = useForm({
        defaultValues: {}
    })
    const [activeSkills, setActiveSkills] = useState(state.skills)
    const [activeEquipments, setActiveEquipments] = useState(state.equipments)

    const onSubmit = (data) => {
        const skillSet = []
        activeSkills.map(skill => {
            skillSet.push({ id: skill.id, text: skill.text })
        })

        const equipmentSet = []
        activeEquipments.map(equip => {
            equipmentSet.push({ id: equip.id, text: equip.text })
        })

        dispatch(submitEquipmentForm({
            skills: skillSet,
            equipments: equipmentSet
        }))
        dispatch(completeForm(3))
        router.push('/auth/register/confirm')
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-6">
                <p className="mb-5">Skill / Experience</p>
                <div className="max-w-fit flex flex-wrap gap-x-8 gap-y-5">
                    {skills.map(item => <SkillCard key={item.id} item={item} setActiveSkills={setActiveSkills} activeSkills={activeSkills} />)}
                </div>

                <p className="mt-9 mb-5">Drone Equipment</p>
                <div className="max-w-fit w-full bg-primaryBlueLight rounded-md p-3 flex flex-wrap gap-x-2 gap-y-3">
                    {droneEquipments.map(item => (
                        <EquipmentBadge key={item.id} item={item} setActiveEquipments={setActiveEquipments} activeEquipments={activeEquipments} />
                    ))}
                </div>

            </div>


            <button className="mt-12 bg-primaryTeal px-10 py-2 uppercase text-color font-semibold text-white text-lg rounded-md">Next</button>
        </form>
    )
}

const SkillCard = ({ item, setActiveSkills, activeSkills }) => {
    let active = false

    activeSkills.filter(filter_item => {
        if (filter_item.id == item.id) {
            active = true
        }
    })

    return (
        <div
            key={item.id}
            onClick={() => {
                if (!active) {
                    setActiveSkills(skills => [...skills, item])
                } else {
                    setActiveSkills(skills => {
                        return skills.filter(skill => skill.id !== item.id)
                    })
                }
            }}
            className={`cursor-pointer flex-1 flex flex-row items-center gap-7  rounded-md px-11 py-6 ${active ? 'active-skill' : 'bg-primaryBlueLight text-primaryBlue'}`}
        >
            {item.icon}
            <p className={`text-xs text-primaryBlue ${active ? 'text-[#2dd1b6]' : 'text-primaryBlue'}`}>{item.text}</p>
        </div>
    )
}

const EquipmentBadge = ({ item, setActiveEquipments, activeEquipments }) => {
    let active;

    activeEquipments.filter(filter_item => {
        if (filter_item.id == item.id) {
            active = true
        }
    })

    return (
        <div >
            <p
                key={item.id}
                onClick={() => {
                    if (!active) {
                        setActiveEquipments(equips => [...equips, item])
                    } else {
                        setActiveEquipments(equips => {
                            return equips.filter(equip => equip.id !== item.id)
                        })
                    }
                }}
                className={`text-sm  px-3 py-2 text-white rounded-md cursor-pointer  transition-all ease-in-out duration-100 ${active ? 'bg-primaryTeal' : 'bg-primaryBlue hover:bg-skyBlue'}`}
            >
                {item.text}
            </p>
        </div>
    )
}

export default EquipmentsForm