import { IconBallpen,  IconHospitalCircle , IconWoman , IconHorse, IconPlant  } from '@tabler/icons-react';
import { Carousel } from '@mantine/carousel';
import { IconArrowRight, IconArrowLeft } from '@tabler/icons-react';

const causes = [
  { 
  icon: <IconBallpen className="h-7 w-7" stroke={2} />, 
  title: "Education for All", 
  description: "Providing education to underprivileged children for a brighter future." 
  },
  { 
  icon: < IconHospitalCircle className="h-7 w-7" stroke={2} />, 
  title: "Healthcare Support", 
  description: "Providing essential medical aid and healthcare services to those in need." 
  }, 
  {
  icon: < IconWoman className="h-7 w-7" stroke={2} />, 
  title: "Women Empowerment", 
  description: "Empowering women through education, skills, and leadership opportunities." 
  },
  {
  icon: < IconHorse className="h-7 w-7" stroke={2} />,
  title: "Animal Welfare", 
  description: "Rescuing and caring for animals in need, ensuring their safety and well-being." 
  },
  {
  icon: < IconPlant className="h-7 w-7" stroke={2} />,
  title: "Environmental ", 
  description: "Safeguarding nature and encouraging sustainable use of resources" 
  },
  { 
    icon: <IconBallpen className="h-7 w-7" stroke={2} />, 
    title: "Education for All", 
    description: "Providing education to underprivileged children for a brighter future." 
    },
    { 
    icon: < IconHospitalCircle className="h-7 w-7" stroke={2} />, 
    title: "Healthcare Support", 
    description: "Providing essential medical aid and healthcare services to those in need." 
    }, 
    {
    icon: < IconWoman className="h-7 w-7" stroke={2} />, 
    title: "Women Empowerment", 
    description: "Empowering women through education, skills, and leadership opportunities." 
    },
    {
    icon: < IconHorse className="h-7 w-7" stroke={2} />,
    title: "Animal Welfare", 
    description: "Rescuing and caring for animals in need, ensuring their safety and well-being." 
    },
    {
    icon: < IconPlant className="h-7 w-7" stroke={2} />,
    title: "Environmental ", 
    description: "Safeguarding nature and encouraging sustainable use of resources" 
    }
];

function NGOCategory() {
  return (
    <div className="mt-24 pb-5">
      <div className="text-4xl text-center font-semibold mb-3 text-mine-shaft-400">
        Browse <span className="text-bright-sun-400">NGO</span> Category
      </div>
      <div className="text-lg mx-auto text-mine-shaft-300 text-center w-1/2">
        Explore various causes and make a meaningful impact. Choose where you want to help and start changing lives today!
      </div>

      <Carousel slideSize="22%" slideGap="md" loop className=''
      nextControlIcon={<IconArrowRight className='h-8 w-8 ' size={16} />}
      previousControlIcon={<IconArrowLeft className='h-8 w-8' size={16} />}>
        {causes.map((cause, index) => (
          <Carousel.Slide key={index}>
            <div className="flex flex-col items-center w-64 mt-20 border border-bright-sun-400 p-2 rounded-xl hover:cursor-pointer">
              <div className="p-4 bg-bright-sun-300 text-mine-shaft-900 rounded-full">
                {cause.icon}
              </div>
              <div className="text-mine-shaft-100 text-xl font-semibold mt-2">{cause.title}</div>
              <div className="text-sm text-center text-mine-shaft-300 mt-1">{cause.description}</div>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
}

export default NGOCategory;
