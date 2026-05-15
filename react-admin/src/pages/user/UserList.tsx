import { useState } from 'react'
import { Button, Modal, Input, Table } from 'antd'
import { message } from 'antd'

export default function UserList() {

  // 表格数据
  const [tableData, setTableData] = useState([
    { id: 1, name: '张三', phone: '13800000000' },
    { id: 2, name: '李四', phone: '13900000000' }
  ])

  // 新增用户输入框的受控状态
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  // 编辑用户时的id
  const [editId, setEditId] = useState<number | null>(null)

  // 控制弹窗显示隐藏
  const [showModal, setShowModal] = useState(false)

  // 当前页码（可选，暂时没用到分页功能）
  const [currentPage, setCurrentPage] = useState(1)


  // 删除用户
  const handleDelete = (id: number) => {
    const newData = tableData.filter(item => item.id !== id)
    setTableData(newData)
    message.success('删除成功')
  }

  // 打开新增弹窗
  const openAddModal = () => {
    setEditId(null)
    setName('')
    setPhone('')
    setShowModal(true)
  }

  // 打开编辑弹窗，回填数据
  const openEditModal = (record: {id:number,name:string,phone:string}) => {
    setEditId(record.id)
    setName(record.name)
    setPhone(record.phone)
    setShowModal(true)
  }

  // 确定：新增 / 编辑
  const handleOk = () => {
    if (!name || !phone) {
      message.warning('请输入完整姓名和手机号')
      return
    }

    // 编辑模式
    if (editId !== null) {
      const newList = tableData.map(item => {
        if (item.id === editId) {
          return {...item, name, phone}
        }
        return item
      })
      setTableData(newList)
      message.success('编辑成功')
    } else {
      // 新增模式
      const newId = Math.max(...tableData.map(item => item.id)) + 1
      const newUser = { id: newId, name, phone }
      setTableData([...tableData, newUser])
      message.success('新增成功')
    }

    setShowModal(false)
    setName('')
    setPhone('')
  }

  return (
    <div>
        <Button 
            type="primary" 
            style={{ margin: '20px 0' }}
            onClick={openAddModal}
        >
        新增用户
        </Button>
        <Table 
            rowKey="id"
            dataSource={tableData}
            pagination={{
                current: currentPage,
                pageSize: 5,
                onChange: (page) => setCurrentPage(page)
            }}
            columns={[
                { title: 'ID', dataIndex: 'id' },
                { title: '姓名', dataIndex: 'name' },
                { title: '手机号', dataIndex: 'phone' },
                { title: '操作', render: (_, record) => (
                    <>
                      <Button type='link' onClick={() => openEditModal(record)}>编辑</Button>
                      <Button type='link' danger onClick={() => handleDelete(record.id)}>删除</Button>
                    </>
                  )}
                ]}
        />

        {/* 弹窗 —— 就放在最外层Layout里面最后就行 */}
      <Modal
        title={editId !== null ? "编辑用户" : "新增用户"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        onOk={handleOk}
      >
        <Input placeholder="请输入用户名" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="请输入手机号" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ marginTop: 10 }} />
      </Modal>     
    </div>  
)
}