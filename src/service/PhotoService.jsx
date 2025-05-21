export const PhotoService = {
    getData() {
        return [
            {
                itemImageSrc: '/gallery/work1.jpeg',
                thumbnailImageSrc: '/gallery/work1.jpeg',
                alt: 'Description for Image 1',
                title: 'Title 1'
            },
            {
                itemImageSrc: '/gallery/work2.jpeg',
                thumbnailImageSrc: '/gallery/work2.jpeg',
                alt: 'Description for Image 2',
                title: 'Title 2'
            },
            {
                itemImageSrc: '/gallery/work3.jpeg',
                thumbnailImageSrc: '/gallery/work3.jpeg',
                alt: 'Description for Image 3',
                title: 'Title 3'
            },
            {
                itemImageSrc: '/gallery/work4.jpeg',
                thumbnailImageSrc: '/gallery/work4.jpeg',
                alt: 'Description for Image 4',
                title: 'Title 4'
            },
            {
                itemImageSrc: '/gallery/work5.jpeg',
                thumbnailImageSrc: '/gallery/work5.jpeg',
                alt: 'Description for Image 5',
                title: 'Title 5'
            }
            ,
            {
                itemImageSrc: '/gallery/work6.jpeg',
                thumbnailImageSrc: '/gallery/work6.jpeg',
                alt: 'Description for Image 6',
                title: 'Title 6'
            }
            ,
            {
                itemImageSrc: '/gallery/work7.jpeg',
                thumbnailImageSrc: '/gallery/work7.jpeg',
                alt: 'Description for Image 7',
                title: 'Title 7'
            }
            ,
            {
                itemImageSrc: '/gallery/work8.jpeg',
                thumbnailImageSrc: '/gallery/work8.jpeg',
                alt: 'Description for Image 8',
                title: 'Title 8'
            }
            ,
            {
                itemImageSrc: '/gallery/work9.jpeg',
                thumbnailImageSrc: '/gallery/work9.jpeg',
                alt: 'Description for Image 9',
                title: 'Title 9'
            }
            ,
            {
                itemImageSrc: '/gallery/work10.jpeg',
                thumbnailImageSrc: '/gallery/work10.jpeg',
                alt: 'Description for Image 10',
                title: 'Title 10'
            }
            ,
            {
                itemImageSrc: '/gallery/work11.jpeg',
                thumbnailImageSrc: '/gallery/work11.jpeg',
                alt: 'Description for Image 11',
                title: 'Title 11'
            }
            ,
            {
                itemImageSrc: '/gallery/work12.jpeg',
                thumbnailImageSrc: '/gallery/work12.jpeg',
                alt: 'Description for Image 12',
                title: 'Title 12'
            }
        ];
    },

    getImages() {
        return Promise.resolve(this.getData());
    }
};