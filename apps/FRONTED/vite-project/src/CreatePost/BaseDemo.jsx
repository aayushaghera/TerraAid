import { Group, Text } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone } from '@mantine/dropzone';

function BaseDemo(props) {
  return (
    <Dropzone
      onDrop={(files) => console.log('Accepted files:', files)}
      onReject={(files) => console.log('Rejected files:', files)}
      maxSize={5 * 1024 ** 2} // 5MB max size
      accept={['image/png', 'image/jpeg', 'image/gif']} // Accept images
      {...props}
    >
      <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
        {/* Icon for accepted files */}
        <Dropzone.Accept>
          <IconUpload size={52} className="text-blue-600" stroke={1.5} />
        </Dropzone.Accept>

        {/* Icon for rejected files */}
        <Dropzone.Reject>
          <IconX size={52} className="text-red-600" stroke={1.5} />
        </Dropzone.Reject>

        {/* Default icon when no action */}
        <Dropzone.Idle>
          <IconPhoto size={52} className="text-gray-500" stroke={1.5} />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
          <Text size="sm" className="text-gray-500" inline mt={7}>
            Attach as many files as you like, each file should not exceed 5MB.
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}

export default BaseDemo;
