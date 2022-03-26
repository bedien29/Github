using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class MarioChet : MonoBehaviour
{
    Vector2 vitrichet;
    private float donay = 3f;
    private float tocdonay = 2f;
    private AudioSource amthanh;
    private bool naylen = true;

    // Start is called before the first frame update
    void Start()
    {
        vitrichet = transform.position;
    }

    // Update is called once per frame
    void Update()
    {
        //TaoAmThanh("chet");
    }

    private void FixedUpdate()
    {
        if (naylen)
        {
            StartCoroutine(MMarioChet());
            naylen = false;
        }
        
    }

    IEnumerator MMarioChet()
    {
        while (true)
        {
            transform.position = new Vector2(transform.position.x, transform.position.y + 3*tocdonay * Time.deltaTime);
            if (transform.position.y >= vitrichet.y + donay)
            {
                break;
            }
            yield return null;
        }
        while (true)
        {
            transform.position = new Vector2(transform.position.x, transform.position.y - tocdonay * Time.deltaTime);
            if (transform.position.y <= vitrichet.y -3f)
            {
                break;
            }
            yield return null;
        }
        SceneManager.LoadScene("GameOver");

    }

    //public void TaoAmThanh(string FileAmThanh)
    //{
    //    amthanh.PlayOneShot(Resources.Load<AudioClip>("Audio/" + FileAmThanh));
    //}
}
