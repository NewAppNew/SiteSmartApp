import React, { Fragment, useEffect, useState } from 'react'
import PageComponent from '../../components/PageComponent'
import { PencilSquareIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/24/solid'
import LinkButton from '../helpers/LinkButton'
import Table from '../helpers/Table'
import Loader from '../Common/Loader'
import axiosClient from '../../Axios'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import flasher from '@flasher/flasher'
import moment from 'moment'

function ViewWorkManagement() {
    document.title = 'SiteSmart - Work Management'
    const tableHeading = ['Sr.No', 'Created Date', 'Work Name', 'Location', 'Work Category', 'Action']
    const [loader, setLoader] = useState(false)
    const [workLists, setWorkLists] = useState('')   
    const getWorkLists = () => {
        setLoader(true)
        axiosClient.get('/work_lists')
        .then(({data})=>{
            setLoader(false)
            setWorkLists(data.lists)
        })
    }
    const deleteWork = (id) =>{
        Swal.fire({
            title: 'Are you sure to delete this?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosClient.delete(`/delete_work/${id}`)
                .then(({data})=>{
                    flasher.success(data.msg)
                    getWorkLists()
                })
            }
        })
    }
    useEffect(()=>{
        getWorkLists()
    },[])
    return (
        <Fragment>
            {loader ? (<Loader/>) : (
                <PageComponent title={'Work Management'} button={
                    <LinkButton to={'/work-management/add-work-management'}>
                        <PlusCircleIcon className='w-5 h-5'/>
                        <span>Add New Site</span>
                    </LinkButton>
                }>
                    {workLists && workLists.length > 0 ? (
                        <Table tableHeading={tableHeading}>
                            {workLists.map((tableData, tableDataID)=>{
                                return(<Fragment key={tableDataID}>
                                    <tr className="bg-default-color text-gray-900 border-b text-center">
                                        <td className="px-4 py-3">{tableDataID+1}</td>
                                        <td className="px-4 py-3">{moment(tableData.created_at).format('D-MM-YYYY')}</td>
                                        <td className="px-4 py-3 font-bold text-primary-color">
                                            <Link to={`/work-management/view-work-management/${tableData.id}`}>{tableData.work_name}</Link>
                                        </td>                                       
                                        <td className="px-4 py-3">{tableData.work_location}</td>
                                        <td className="px-4 py-3">{tableData.work_category}</td>

                                        {/* <td className="px-4 py-3">
                                            {
                                                tableData.work_category === 'project_management' ? "Project Management" 
                                                : tableData.marketing_type === 'interior_designing' ? "Interior Designing"
                                                : tableData.marketing_type === 'plan_and_designing' ? "Plan & Designing"
                                                : "Construction"
                                            }
                                        </td> */}
                                        <td className="px-4 py-3">
                                            <div className='flex justify-center gap-3'>
                                                <Link title='Edit' to={`/work-management/edit-work-management/${tableData.id}`}><div className={'p-1.5 text-white bg-yellow-400 rounded-lg'}><PencilSquareIcon className='w-5 h-5'/></div></Link>
                                                <div onClick={()=>deleteWork(tableData.id)} title={'Delete'} className={'p-1.5 text-white bg-red-600 rounded-lg cursor-pointer'}><TrashIcon className='w-5 h-5'/></div>
                                            </div>
                                        </td>
                                    </tr>
                                </Fragment>)
                            })}
                        </Table>
                    ) : (
                        <div className='flex justify-center items-center h-[70vh]'>
                            <p className='text-3xl font-bold'>Sorry! Works Data Not Found</p>
                        </div>
                    )}
                </PageComponent>
            )}
        </Fragment>
    )
}


export default ViewWorkManagement
