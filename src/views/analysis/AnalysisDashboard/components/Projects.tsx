import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useNavigate } from 'react-router-dom'
import ListItem, { ListItemData } from './ListItem'

type ProjectsProps = {
    data?: ListItemData[]
}

const Projects = ({ data = [] }: ProjectsProps) => {
    const navigate = useNavigate()

    const onViewAllProjects = () => {
        navigate('/app/project/project-list')
    }

    return (
        <Card>
            <div className="flex items-center justify-between mb-6">
                <h4>Projects</h4>
                <Button size="sm" onClick={onViewAllProjects}>
                    View All
                </Button>
            </div>
            {[1].map((project,index) => (
                <ListItem key={index}   />
            ))}
        </Card>
    )
}

export default Projects
